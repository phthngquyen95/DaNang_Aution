import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterAuctionTypeEnum1749605551014 implements MigrationInterface {
  name = 'AlterAuctionTypeEnum1749605551014';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE auction_documents
      SET auction_type = 'public'
      WHERE auction_type = 'restricted'
    `);

    // Thay đổi ENUM
    await queryRunner.query(`
      ALTER TABLE auction_documents
      MODIFY COLUMN auction_type ENUM('public', 'private') DEFAULT 'public'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE auction_documents
      MODIFY COLUMN auction_type ENUM('public', 'private', 'restricted') DEFAULT 'public'
    `);
  }
}
