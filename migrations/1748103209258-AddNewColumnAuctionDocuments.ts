import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewColumnAuctionDocuments1748103209258
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE auction_documents
        ADD COLUMN description TEXT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE auction_documents
        DROP COLUMN description;
    `);
  }
}
