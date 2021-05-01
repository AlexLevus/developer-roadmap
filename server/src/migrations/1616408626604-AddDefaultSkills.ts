import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaultSkills1616408626604 implements MigrationInterface {
  name = 'AddDefaultSkills1616408626604';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO skills (
          name,
          is_default
        )
        VALUES
          (
            'React',
            true
          ),
          (
            'Vue',
            true
          ),
          (
            'Spring',
            true
          ),
          (
            'NodeJS',
            true
          ),
          (
            'PostgreSQL',
            true
          );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM skills WHERE is_default = true;`);
  }
}
