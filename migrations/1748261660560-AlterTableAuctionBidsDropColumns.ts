import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableAuctionBidsDropColumns1748261660560
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE auction_bids
        DROP FOREIGN KEY FK_bid_user,
        DROP FOREIGN KEY FK_bid_session;
    `);
    await queryRunner.query('ALTER TABLE `auction_bids` DROP `userId`');
    await queryRunner.query('ALTER TABLE `auction_bids` DROP `sessionId`');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE auction_bids
        ADD CONSTRAINT FK_bid_user FOREIGN KEY (userId) REFERENCES users(id),
        ADD CONSTRAINT FK_bid_session FOREIGN KEY (sessionId) REFERENCES sessions(id);
    `);
    await queryRunner.query(
      'ALTER TABLE `auction_bids` ADD `userId` int NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `auction_bids` ADD `sessionId` int NOT NULL',
    );
  }
}
