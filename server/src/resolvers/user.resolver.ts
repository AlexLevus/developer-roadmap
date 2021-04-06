import { Mutation, Args, Context, Resolver, Query } from '@nestjs/graphql';

import { Department, Skill, User } from '@models';
import { getRepository } from 'typeorm';
import {
  ApolloError,
  AuthenticationError,
  ForbiddenError
} from 'apollo-server-core';

import { comparePassword, hashPassword } from '@utils';
import { generateToken, verifyToken, tradeToken } from '@auth';
import { EmailResolver } from './email.resolver';
import { sendMail } from '@shared';
import {
  UpdateUserInput,
  CreateUserInput,
  LoginUserInput,
  LoginResponse,
  RefreshTokenResponse,
  Type
} from '../generator/graphql.models';
import { SkillResolver } from './skill.resolver';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly emailResolver: EmailResolver,
    private readonly skillResolver: SkillResolver
  ) {}

  @Query()
  async users(): Promise<User[]> {
    return getRepository(User).find({
      cache: true
    });
  }

  @Query()
  async user(@Args('id') id: string): Promise<User> {
    try {
      const user = await getRepository(User).findOne({ id });

      if (!user) {
        throw new ForbiddenError('Пользователь не найден');
      }

      return user;
    } catch (error) {
      throw new ApolloError(error);
    }
  }

  @Query()
  async organizationUsers(@Args('orgId') orgId: string): Promise<User[]> {
    try {
      const user = await getRepository(User).find({ orgId });

      return user;
    } catch (error) {
      throw new ApolloError(error);
    }
  }

  @Mutation()
  async updateUser(@Args('input') input: UpdateUserInput): Promise<boolean> {
    const { id, orgId, positionId } = input;

    const existedUser = await getRepository(User).findOne({
      where: {
        id
      }
    });

    if (!existedUser) {
      throw new ForbiddenError('Пользователь не найден');
    }

    const updateUser = await getRepository(User).update(
      id,
      new User({
        ...existedUser,
        ...input,
        orgId,
        positionId
      })
    );

    return !!updateUser;
  }

  @Mutation()
  async login(@Args('input') input: LoginUserInput): Promise<LoginResponse> {
    const { email, password } = input;
    const user = await getRepository(User).findOne({
      where: { email }
    });

    if (user && (await comparePassword(password, user.password))) {
      const { accessToken, refreshToken } = await tradeToken(user);
      return {
        id: user.id,
        accessToken,
        refreshToken
      };
    }

    throw new AuthenticationError('Login failed.');
  }

  @Mutation()
  async registerUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context('req') req: any = 'localhost'
  ): Promise<User> {
    const existedUser = await getRepository(User).findOne({
      where: {
        email
      }
    });

    if (existedUser) {
      throw new ForbiddenError('Пользователь с таким email уже существует');
    }

    const createdUser = await getRepository(User).save(
      new User({
        email,
        password: await hashPassword(password)
      })
    );

    const emailToken = await generateToken(createdUser, 'emailToken');
    const existedEmail = await this.emailResolver.createEmail({
      userId: createdUser.id,
      type: Type.VERIFY_EMAIL
    });

    await sendMail(
      'verifyEmail',
      createdUser,
      req,
      emailToken,
      existedEmail.id
    );

    return createdUser;
  }

  @Mutation()
  async createUser(@Args('input') input: CreateUserInput): Promise<boolean> {
    const {
      email,
      password,
      skills,
      departmentId,
      firstName,
      lastName,
      middleName,
      orgId,
      positionId
    } = input;

    const newUser = await this.registerUser(email, password);

    skills.map((skill) => ({
      id: +skill.id,
      name: skill.name
    }));

    if (newUser) {
      const savedSkills = skills
        .filter((skill) => skill.id === null)
        .map((skill) => this.skillResolver.createSkill(skill.name));

      newUser.skills = [
        ...skills.filter((skill) => skill.id !== null),
        ...(await Promise.all(savedSkills))
      ] as Skill[];

      newUser.departments = [
        await getRepository(Department).findOne({
          where: {
            id: departmentId
          }
        })
      ] as Department[];

      await getRepository(User).save(newUser);
      const updateUser = await getRepository(User).update(newUser.id, {
        firstName,
        lastName,
        middleName,
        orgId,
        positionId
      });

      return !!updateUser;
    }

    return false;
  }

  @Mutation()
  async verifyEmail(@Args('emailToken') emailToken: string): Promise<boolean> {
    const user = await verifyToken(emailToken, 'emailToken');

    if (!user) {
      throw new ForbiddenError('Token is invalid.');
    }

    if (!user.isActive) {
      const updateUser = await getRepository(User).save(
        new User({
          ...user,
          isActive: true
        })
      );

      return !!updateUser;
    } else {
      throw new ForbiddenError('Your email has been verified.');
    }
  }

  @Mutation()
  async refreshToken(
    @Args('refreshToken') refreshToken: string
  ): Promise<RefreshTokenResponse> {
    const user = await verifyToken(refreshToken, 'refreshToken');

    const accessToken = await generateToken(user, 'accessToken');

    return { accessToken };
  }

  @Mutation()
  async changePassword(
    @Args('id') id: string,
    @Args('currentPassword') currentPassword: string,
    @Args('password') password: string
  ): Promise<boolean> {
    const user = await getRepository(User).findOne({ id });

    if (!user) {
      throw new ForbiddenError('User not found.');
    }

    if (!(await comparePassword(currentPassword, user.password))) {
      throw new ForbiddenError(
        'Your current password is missing or incorrect.'
      );
    }

    if (await comparePassword(password, user.password)) {
      throw new ForbiddenError(
        'Your new password must be different from your previous password.'
      );
    }

    const updateUser = await getRepository(User).save(
      new User({
        ...user,
        password: await hashPassword(password)
      })
    );

    return !!updateUser;
  }

  @Mutation()
  async forgotPassword(
    @Args('email') email: string,
    @Context('req') req: any
  ): Promise<boolean> {
    const user = await getRepository(User).findOne({
      where: {
        email: email,
        isActive: true
      }
    });

    if (!user) {
      throw new ForbiddenError('User not found.');
    }

    const resetPassToken = await generateToken(user, 'resetPassToken');

    const existedEmail = await this.emailResolver.createEmail({
      userId: user.id,
      type: Type.FORGOT_PASSWORD
    });

    await sendMail(
      'forgotPassword',
      user,
      req,
      resetPassToken,
      existedEmail.id
    );

    const date = new Date();

    const updateUser = await getRepository(User).save(
      new User({
        ...user,
        resetPasswordToken: resetPassToken,
        resetPasswordExpires: date.setHours(date.getHours() + 1) // 1 hour
      })
    );

    return !!updateUser;
  }

  @Mutation()
  async resetPassword(
    @Args('resetPasswordToken') resetPasswordToken: string,
    @Args('password') password?: string
  ): Promise<boolean> {
    const user = await verifyToken(resetPasswordToken, 'resetPassToken');

    if (user && !password) {
      return true;
    }

    if (!user) {
      throw new ForbiddenError('Token is invalid.');
    }

    if (user.resetPasswordExpires < Date.now()) {
      throw new AuthenticationError(
        'Reset password token is invalid, please try again.'
      );
    }

    if (await comparePassword(password, user.password)) {
      throw new ForbiddenError(
        'Your new password must be different from your previous password.'
      );
    }

    const updateUser = await getRepository(User).save(
      new User({
        ...user,
        email: user.email,
        password: await hashPassword(password),
        resetPasswordExpires: null
      })
    );

    return !!updateUser;
  }
}
