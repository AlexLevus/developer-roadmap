import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import * as Resolvers from './resolvers';
import * as Scalars from './config/graphql/scalars';
import { GraphqlService } from './config/graphql';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GraphqlService
    }),
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...Object.values(Resolvers),
    ...Object.values(Scalars)
  ]
})
export class AppModule {}
