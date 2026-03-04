import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewColumnAuctionParticipants1748538570856
  implements MigrationInterface
{
  name = 'AddNewColumnAuctionParticipants1748538570856';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE auction_session_participants
      ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE auction_session_participants
      DROP COLUMN updated_at,
      DROP COLUMN created_at
    `);
  }
}
