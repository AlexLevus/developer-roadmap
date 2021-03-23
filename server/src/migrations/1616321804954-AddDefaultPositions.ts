import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaultPositions1616321804954 implements MigrationInterface {
  name = 'AddDefaultPositions1616321804954';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO positions (
        name,
        description,
        is_active
      )
      VALUES
        (
          'Front-End Developer',
          'Разрабатывает интерфейсы',
          true
        ),
        (
          'Back-End Developer',
          'Разрабатывает сервер',
          true
        ),
        (
          'Product Manager',
          'Отвечает за создание продукта',
          true
        );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM positions WHERE id < 4;`);
  }
}
