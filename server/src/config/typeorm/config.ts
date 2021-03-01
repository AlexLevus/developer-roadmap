import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pQcRedH9S8fpfVfF',
      database: 'developer-roadmap',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true
    };
  }
}
