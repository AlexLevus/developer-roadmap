import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { getRepository } from 'typeorm';

import { Department, Roadmap, Stage, UserRoadmap } from '@models';
import { CreateRoadmapInput } from '../generator/graphql.models';
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

  @Query()
  async userRoadmaps(@Args('userId') userId: string): Promise<Roadmap[]> {
    const userRoadmaps = await getRepository(UserRoadmap).find({ userId });

    const roadmaps: Roadmap[] = [];

    for (const roadmap of userRoadmaps) {
      roadmaps.push(
        await getRepository(Roadmap).findOne({
          id: roadmap.roadmapId
        })
      );
    }

    return roadmaps;
  }

  @Mutation()
  async createRoadmap(
    @Args('input') input: CreateRoadmapInput
  ): Promise<Roadmap> {
    return await getRepository(Roadmap).save(new Roadmap(input));
  }

  @Mutation()
  async addRoadmapToUser(
    @Args('roadmapId') roadmapId: string,
    @Args('userId') userId: string
  ): Promise<boolean> {
    const roadmap = await getRepository(UserRoadmap).findOne({
      roadmapId,
      userId
    });

    if (roadmap) {
      throw new ForbiddenError('Этот роадмап у пользователя уже есть');
    }

    return !!(await getRepository(UserRoadmap).save(
      new UserRoadmap({ roadmapId, userId })
    ));
  }

  @Mutation()
  async removeUserRoadmap(
    @Args('roadmapId') roadmapId: string,
    @Args('userId') userId: string
  ): Promise<boolean> {
    return !!(await getRepository(UserRoadmap).delete({ userId, roadmapId }));
  }
}
