import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { getRepository } from 'typeorm';

import { Roadmap, Stage, User } from '@models';
import { CreateStageInput } from '../generator/graphql.models';

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
    const lastStage = roadmapStages[roadmapStages.length - 1];
    const path = lastStage ? String(+lastStage.path.split('.')[0] + 1) : '1';

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
}
