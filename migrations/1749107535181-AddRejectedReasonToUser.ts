import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRejectedReasonToUser1749107535181
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users ADD COLUMN rejected_reason TEXT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users DROP COLUMN rejected_reason;
    `);
  }
}
