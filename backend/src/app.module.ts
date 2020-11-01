import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmService } from './config/typeorm/config';

import * as Resolvers from './resolvers';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/generator/graphql.schema.ts'),
        outputAs: 'class'
      },
      debug: true,
      playground: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService
    })
  ],
  controllers: [AppController],
  providers: [AppService, ...Object.values(Resolvers)]
})
export class AppModule {}
