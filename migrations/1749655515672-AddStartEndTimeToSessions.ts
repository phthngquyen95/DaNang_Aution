import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStartEndTimeToSessions1749655515672
  implements MigrationInterface
{
  name = 'AddStartEndTimeToSessions1749655515672';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE auction_sessions ADD COLUMN start_time DATETIME NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE auction_sessions ADD COLUMN end_time DATETIME NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE auction_sessions DROP COLUMN start_time`,
    );
    await queryRunner.query(
      `ALTER TABLE auction_sessions DROP COLUMN end_time`,
    );
  }
}
