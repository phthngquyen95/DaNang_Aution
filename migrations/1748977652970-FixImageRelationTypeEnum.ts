import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixImageRelationTypeEnum1748977652970
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE image_relation
      MODIFY COLUMN type ENUM('asset', 'auction') NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE image_relation
      MODIFY COLUMN type VARCHAR(50) NOT NULL
    `);
  }
}
