import { Resolver, Query } from '@nestjs/graphql';
import { getRepository } from 'typeorm';
import { Position } from '@models';

@Resolver('Position')
export class PositionResolver {
  @Query()
  async positions(): Promise<Position[]> {
    return getRepository(Position).find({
      cache: true
    });
  }
}
