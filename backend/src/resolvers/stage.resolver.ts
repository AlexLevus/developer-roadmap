import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { getRepository } from 'typeorm';

import { Stage } from '@models';
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
    return await getRepository(Stage).save(new Stage(input));
  }
}
