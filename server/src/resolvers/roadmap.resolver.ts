import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { getRepository } from 'typeorm';

import { Roadmap, Stage, User, UserRoadmap } from '@models';
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
        throw new ForbiddenError('План развития не найден');
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
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('authorId') authorId: string
  ): Promise<Roadmap> {
    const author = await getRepository(User).findOne({ id: authorId });

    const roadmap = await getRepository(Roadmap).save(
      new Roadmap({ name, description, author })
    );

    await getRepository(Roadmap).update(roadmap.id, {
      author
    });

    return roadmap;
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
