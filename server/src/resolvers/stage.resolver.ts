import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { getRepository } from 'typeorm';

import { Roadmap, Stage, User } from '@models';
import { CreateStageInput } from '../generator/graphql.schema';

@Resolver('Stage')
export class StageResolver {
  @Query()
  async stages(): Promise<Stage[]> {
    return getRepository(Stage).find({
      cache: true
    });
  }

  @Mutation()
  async createStage(@Args('input') input: CreateStageInput): Promise<Stage> {
    const { name, path } = input;

    const roadmapId = path.split('.')[0];

    const stageData: Partial<Stage> = {
      name,
      roadmapId,
      path
    };

    return await getRepository(Stage).save(new Stage(stageData));
  }
}
