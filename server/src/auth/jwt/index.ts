import { sign, verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { AuthenticationError, ForbiddenError } from 'apollo-server-core';

import { User } from '@models';
import { LoginResponse } from '../../generator/graphql.models';

import {
  ISSUER,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  EMAIL_TOKEN_SECRET,
  RESETPASS_TOKEN_SECRET
} from '@environments';

type TokenType =
  | 'accessToken'
  | 'refreshToken'
  | 'emailToken'
  | 'resetPassToken';

const common = {
  accessToken: {
    privateKey: ACCESS_TOKEN_SECRET!,
    signOptions: {
      expiresIn: '30d' // 15m
    }
  },
  refreshToken: {
    privateKey: REFRESH_TOKEN_SECRET!,
    signOptions: {
      expiresIn: '7d'
    }
  },
  emailToken: {
    privateKey: EMAIL_TOKEN_SECRET!,
    signOptions: {
      expiresIn: '1d'
    }
  },
  resetPassToken: {
    privateKey: RESETPASS_TOKEN_SECRET!,
    signOptions: {
      expiresIn: '1d'
    }
  }
};

export const generateToken = async (
  user: User,
  type: TokenType
): Promise<string> => {
  const { id, isAdmin, isActive, positionId, orgId, departmentId } = user;
  return await sign(
    {
      id,
      isActive,
      isAdmin,
      positionId,
      orgId,
      departmentId
    },
    common[type].privateKey,
    {
      issuer: ISSUER!,
      subject: user.email,
      algorithm: 'HS256',
      expiresIn: common[type].signOptions.expiresIn // 15m
    }
  );
};

export const verifyToken = async (
  token: string,
  type: TokenType
): Promise<User> => {
  let currentUser;

  await verify(token, common[type].privateKey, async (err, data) => {
    if (err) {
      throw new AuthenticationError(
        'Неверный токен аутентификации, попробуйте снова'
      );
    }

    currentUser = await getRepository(User).findOne({
      id: data.id
    });
  });

  if (type === 'emailToken') {
    return currentUser;
  }

  if (currentUser && !currentUser.isActive) {
    throw new ForbiddenError('Пожалуйста, подтвердите вашу почту');
  }

  return currentUser;
};

export const tradeToken = async (
  user: User
): Promise<Partial<LoginResponse>> => {
  if (!user.isActive) {
    throw new ForbiddenError('Пожалуйста, подтвердите вашу почту');
  }

  const accessToken = await generateToken(user, 'accessToken');
  const refreshToken = await generateToken(user, 'refreshToken');

  return { accessToken, refreshToken };
};
