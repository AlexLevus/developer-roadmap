import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { getRepository } from 'typeorm';

import { Department, Organization, User } from '@models';
import { ApolloError, ForbiddenError } from 'apollo-server-core';

@Resolver('Department')
export class DepartmentResolver {
  @Query()
  async department(@Args('id') id: string): Promise<Department> {
    try {
      const department = await getRepository(Department).findOne({ id });

      if (!department) {
        throw new ForbiddenError('Roadmap not found.');
      }

      return department;
    } catch (error) {
      throw new ApolloError(error);
    }
  }

  @Query()
  async organizationDepartments(
    @Args('orgId') orgId: string
  ): Promise<Department[]> {
    return await getRepository(Department).find({
      organization: {
        id: orgId
      }
    });
  }

  @Mutation()
  async createDepartment(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('orgId') orgId: string,
    @Args('managerId') managerId: string
  ): Promise<Department> {
    const existedDepartment = await getRepository(Department).findOne({
      where: {
        name
      }
    });

    if (existedDepartment) {
      throw new ForbiddenError('Департамент с таким именем уже существует');
    }

    const organization = await getRepository(Organization).findOne({
      where: {
        id: orgId
      }
    });

    if (!organization) {
      throw new ForbiddenError('Неправильно указана организация');
    }

    const manager = await getRepository(User).findOne({
      where: {
        id: managerId
      }
    });

    const isUserAlreadyManager = await getRepository(Department).findOne({
      where: {
        manager
      }
    });

    if (isUserAlreadyManager) {
      throw new ForbiddenError(
        'Пользователь уже является директором департамента'
      );
    }

    const department = await getRepository(Department).save(
      new Department({ name, description, orgId, isActive: true })
    );

    await getRepository(Department).update(department.id, {
      manager
    });

    return department;
  }
}
