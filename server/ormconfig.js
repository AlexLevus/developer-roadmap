module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  database:  process.env.POSTGRES_DB,
  username:  process.env.POSTGRES_USER,
  password:  process.env.POSTGRES_PASSWORD,
  //username: 'postgres',
  //password: 'pQcRedH9S8fpfVfF',
  //database: 'developer-roadmap-2',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  migrationsRun: true,
  synchronize: true,
  logging: true,
  cli: {
    migrationsDir: 'src/migrations'
  }
};
