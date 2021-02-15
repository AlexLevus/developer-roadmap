import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { getRepository } from 'typeorm';

import { Roadmap, Stage, User } from '@models';
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
  async roadmap(@Args('id') id: string): Promise<Roadmap> {
    try {
      const roadmap = await getRepository(Roadmap).findOne({ id });
      const stages = await getRepository(Stage).find({
        roadmapId: roadmap.id
      });

      if (!roadmap) {
        throw new ForbiddenError('Roadmap not found.');
      }

      roadmap.stages = stages;
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
