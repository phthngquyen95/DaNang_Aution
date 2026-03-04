import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddrRejectedReasonToAuctionDocument1749648938466
  implements MigrationInterface
{
  name = 'AddrRejectedReasonToAuctionDocument1749648938466';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE auction_documents
            ADD COLUMN rejected_reason VARCHAR(255) NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE auction_documents
            DROP COLUMN rejected_reason
        `);
  }
}
