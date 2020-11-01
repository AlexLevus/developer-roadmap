import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { getRepository } from 'typeorm';
import { ForbiddenError } from 'apollo-server-core';

import { Email } from '@models';
import { CreateEmailInput } from '../generator/graphql.schema';

@Resolver('Email')
export class EmailResolver {
  @Query()
  async emails(): Promise<Email[]> {
    return getRepository(Email).find({
      cache: true
    });
  }

  @Mutation()
  async createEmail(@Args('input') input: CreateEmailInput): Promise<Email> {
    return await getRepository(Email).save(new Email(input));
  }

  @Mutation()
  async openEmail(@Args('id') id: string): Promise<boolean> {
    const email = await getRepository(Email).findOne({
      id
    });

    if (!email) {
      throw new ForbiddenError('Email not found.');
    }

    email.isOpened = true;

    return !!(await getRepository(Email).save(email));
  }
}
