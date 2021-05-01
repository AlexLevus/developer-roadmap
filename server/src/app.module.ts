import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import * as Resolvers from './resolvers';
import * as Scalars from './scalars';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/generator/graphql.models.ts'),
        outputAs: 'class'
      },
      debug: true,
      playground: true
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
