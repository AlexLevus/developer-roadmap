import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { getRepository } from 'typeorm';

import { Roadmap, Stage, User, UserRoadmap, UserRoadmapStage } from '@models';
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
  async roadmap(
    @Args('id') id: string,
    @Context('currentUser') currentUser: User
  ): Promise<Roadmap> {
    try {
      const roadmap = await getRepository(Roadmap).findOne({ id });
      const userRoadmap = await getRepository(UserRoadmap).findOne({
        userId: currentUser.id,
        roadmapId: id
      });

      if (!roadmap) {
        throw new ForbiddenError('План развития не найден');
      }

      if (userRoadmap) {
        const stages = await getRepository(Stage)
          .createQueryBuilder('stages')
          .leftJoinAndMapOne(
            'stages.userProgressInfo',
            UserRoadmapStage,
            'user_roadmaps_stages',
            'stages.id = user_roadmaps_stages.stage_id'
          )
          .where('stages.roadmapId = :roadmapId', { roadmapId: id })
          .getMany();

        roadmap.stages = stages.map((stage) => {
          return {
            id: stage.id,
            name: stage.name,
            path: stage.path,
            roadmapId: stage.roadmapId,
            isCompleted: stage.userProgressInfo?.isCompleted
          };
        });

        roadmap.userRoadmapId = userRoadmap.id;
      }

      return roadmap;
    } catch (error) {
      throw new ApolloError(error);
    }
  }

  @Query()
  async userRoadmaps(
    @Args('userId') userId: string
  ): Promise<
    (Roadmap & Pick<UserRoadmap, 'startDate' | 'isCompleted' | 'progress'>)[]
  > {
    const userRoadmaps = await getRepository(UserRoadmap).find({ userId });

    const roadmaps: (Roadmap &
      Pick<UserRoadmap, 'startDate' | 'isCompleted' | 'progress'>)[] = [];

    for (const roadmap of userRoadmaps) {
      const stages = await getRepository(Stage)
        .createQueryBuilder('stages')
        .leftJoinAndMapOne(
          'stages.userProgressInfo',
          UserRoadmapStage,
          'user_roadmaps_stages',
          'stages.id = user_roadmaps_stages.stage_id'
        )
        .where('stages.roadmapId = :roadmapId', {
          roadmapId: roadmap.roadmapId
        })
        .getMany();

      const completedStages = stages.filter(
        (stage) => stage.userProgressInfo?.isCompleted
      );

      const progress =
        completedStages.length === 0
          ? 0
          : Math.round((completedStages.length / stages.length) * 100);

      console.log(stages, progress);

      roadmaps.push({
        ...(await getRepository(Roadmap).findOne({
          id: roadmap.roadmapId
        })),
        startDate: roadmap.startDate,
        isCompleted: roadmap.isCompleted,
        progress
      });
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

    const roadmapStages = await getRepository(Stage).find({ roadmapId });

    const leafStages = this.getLeafStages(roadmapStages);

    const newUserRoadmap = await getRepository(UserRoadmap).save(
      new UserRoadmap({ roadmapId, userId })
    );

    for (const stage of leafStages) {
      await getRepository(UserRoadmapStage).save(
        new UserRoadmapStage({
          userId,
          roadmapId,
          stageId: stage.id,
          userRoadmapId: newUserRoadmap.id
        })
      );
    }

    return !!newUserRoadmap;
  }

  @Mutation()
  async removeUserRoadmap(
    @Args('roadmapId') roadmapId: string,
    @Args('userId') userId: string
  ): Promise<boolean> {
    return !!(await getRepository(UserRoadmap).delete({ userId, roadmapId }));
  }

  private getLeafStages(stages: Stage[]) {
    const paths = stages.reduce((acc, cur) => {
      return [...acc, cur.path];
    }, []);

    return stages.filter((stage) => {
      return !paths.some((path) => path.startsWith(stage.path + '.'));
    });
  }
}
