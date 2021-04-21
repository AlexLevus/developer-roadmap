import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { getRepository } from 'typeorm';

import { Skill } from '@models';

@Resolver('Skill')
export class SkillResolver {
  @Query()
  async skills(): Promise<Skill[]> {
    return getRepository(Skill).find({
      isDefault: true
    });
  }

  // Есть пул навыков. Если нет нужного, то пользователь может создать свой, при этом он не будет предложен другим
  @Mutation()
  async createSkill(@Args('name') name: string): Promise<Skill> {
    const existedSkill = await getRepository(Skill).findOne({
      where: {
        name
      }
    });

    if (existedSkill) {
      return existedSkill;
    }

    const newSkill = await getRepository(Skill).save(new Skill({ name }));

    return newSkill;
  }
}
