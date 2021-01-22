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
    const { name, path, newId, roadmapId } = input;

    /*    const roadmap: Roadmap = await getRepository(Roadmap).findOne({
      id: roadmapId
    });*/

    const stagePath = path === '' ? roadmapId : path.concat('.', newId);

    const stageData: Partial<Stage> = {
      name,
      roadmapId,
      path: stagePath
    };

    return await getRepository(Stage).save(new Stage(stageData));
  }
}
