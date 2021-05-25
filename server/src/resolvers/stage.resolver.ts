import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { getConnection, getRepository, In } from 'typeorm';

import { Stage, User, UserRoadmapStage } from '@models';
import {
  DeleteStageInput,
  CreateStageInput,
  ToggleStageProgressInput
} from '../generator/graphql.models';

@Resolver('Stage')
export class StageResolver {
  @Query()
  async stages(): Promise<Stage[]> {
    return getRepository(Stage).find({
      cache: true
    });
  }

  @Mutation()
  async createStage(
    @Args('text') text: string,
    @Args('roadmapId') roadmapId: string
  ): Promise<Stage> {
    const roadmapStages = await getRepository(Stage).find({ roadmapId });
    const path =
      roadmapStages.length !== 0
        ? String(
            Math.max(
              ...roadmapStages
                .filter((stage) => !stage.path.includes('.'))
                .map((stage) => +stage.path)
            ) + 1
          )
        : '1';

    const stageData: Partial<Stage> = {
      name: text,
      path,
      roadmapId
    };

    return await getRepository(Stage).save(new Stage(stageData));
  }

  @Mutation()
  async createSubstage(@Args('input') input: CreateStageInput): Promise<Stage> {
    const { name, path, roadmapId } = input;

    const stageData: Partial<Stage> = {
      name,
      roadmapId,
      path
    };

    return await getRepository(Stage).save(new Stage(stageData));
  }

  @Mutation()
  async deleteStage(@Args('input') input: DeleteStageInput): Promise<boolean> {
    const { stageIds } = input;
    return !!(await getRepository(Stage).delete({ id: In(stageIds) }));
  }

  @Mutation()
  async toggleStageProgress(
    @Args('input') input: ToggleStageProgressInput,
    @Context('currentUser') currentUser: User
  ): Promise<boolean> {
    const { stageIds, isCompleted, roadmapId } = input;
    const userId = currentUser.id;

    console.log(
      stageIds.map((stageId) => ({
        userId,
        roadmapId,
        stageId
      }))
    );

    return !!(await getConnection()
      .createQueryBuilder()
      .update(UserRoadmapStage)
      .set({ isCompleted })
      .whereInIds(
        stageIds.map((stageId) => ({
          userId,
          roadmapId,
          stageId
        }))
      )
      .execute());
  }
}
