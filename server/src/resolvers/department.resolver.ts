import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { getRepository } from 'typeorm';

import { Department, Organization } from '@models';
import { ForbiddenError } from 'apollo-server-core';

@Resolver('Department')
export class DepartmentResolver {
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
    @Args('orgId') orgId: string
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

    return await getRepository(Department).save(
      new Department({ name, description, orgId, isActive: true })
    );
  }
}
