module.exports = {
  type: 'postgres',
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database:  process.env.PGDATABASE,
  username:  process.env.PGUSER,
  password:  process.env.PGPASSWORD,
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
