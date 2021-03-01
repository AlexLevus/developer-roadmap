import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { getRepository } from 'typeorm';

import { Organization } from '@models';
import { ApolloError, ForbiddenError } from 'apollo-server-core';

@Resolver('Organization')
export class OrganizationResolver {
  @Query()
  async organization(@Args('id') id: string): Promise<Organization> {
    try {
      const organization = await getRepository(Organization).findOne({ id });

      if (!organization) {
        throw new ForbiddenError('Организация не найдена');
      }

      return organization;
    } catch (error) {
      throw new ApolloError(error);
    }
  }

  @Mutation()
  async createOrganization(
    @Args('name') name: string,
    @Args('directorId') directorId: string
  ): Promise<Organization> {
    const existedOrganization = await getRepository(Organization).findOne({
      where: {
        name
      }
    });

    if (existedOrganization) {
      throw new ForbiddenError('Организация с таким именем уже существует');
    }

    return await getRepository(Organization).save(
      new Organization({ name, directorId, isActive: true })
    );
  }
}
