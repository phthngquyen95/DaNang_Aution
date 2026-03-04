import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationsToAuctionBids1747911234567
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE auction_bids
        ADD COLUMN userId INT,
        ADD COLUMN sessionId INT;
    `);

    await queryRunner.query(`
      ALTER TABLE auction_bids
        ADD CONSTRAINT FK_bid_user FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE;
    `);

    await queryRunner.query(`
      ALTER TABLE auction_bids
        ADD CONSTRAINT FK_bid_session FOREIGN KEY (sessionId) REFERENCES auction_sessions(id) ON DELETE SET NULL ON UPDATE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE auction_bids
        DROP FOREIGN KEY FK_bid_user,
        DROP FOREIGN KEY FK_bid_session;
    `);
    await queryRunner.query(`
      ALTER TABLE auction_bids
        DROP COLUMN userId,
        DROP COLUMN sessionId;
    `);
  }
}
