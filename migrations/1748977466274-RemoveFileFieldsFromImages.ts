import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveFileFieldsFromImages1748977466274
  implements MigrationInterface
{
  name = 'RemoveFileFieldsFromImages1748977466274';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE images DROP COLUMN file_path`);
    await queryRunner.query(`ALTER TABLE images DROP COLUMN file_name`);
    await queryRunner.query(`ALTER TABLE images DROP COLUMN file_extension`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE images ADD COLUMN file_path text`);
    await queryRunner.query(
      `ALTER TABLE images ADD COLUMN file_name varchar(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE images ADD COLUMN file_extension varchar(10)`,
    );
  }
}
