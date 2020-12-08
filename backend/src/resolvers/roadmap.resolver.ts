import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { getRepository } from 'typeorm';

import { Roadmap, User } from '@models';
import { CreateRoadmapInput } from '../generator/graphql.schema';
import { ApolloError, ForbiddenError } from 'apollo-server-core';

@Resolver('Roadmap')
export class RoadmapResolver {
  @Query()
  async roadmaps(): Promise<Roadmap[]> {
    return getRepository(Roadmap).find({
      cache: true
    });
  }

  @Query()
  async roadmapById(@Args('id') id: string): Promise<Roadmap> {
    try {
      const roadmap = await getRepository(Roadmap).findOne({ id });

      if (!roadmap) {
        throw new ForbiddenError('Roadmap not found.');
      }

      return roadmap;
    } catch (error) {
      throw new ApolloError(error);
    }
  }

  @Mutation()
  async createRoadmap(
    @Args('input') input: CreateRoadmapInput
  ): Promise<Roadmap> {
    return await getRepository(Roadmap).save(new Roadmap(input));
  }
}
