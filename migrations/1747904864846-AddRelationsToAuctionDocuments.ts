import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationsToAuctionDocuments1747904864846
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Bước 1: Thêm cột trước
    await queryRunner.query(`
      ALTER TABLE auction_documents
        ADD COLUMN userId INT,
        ADD COLUMN sessionId INT,
        ADD COLUMN categoryId INT;
    `);

    // Bước 2: Thêm khóa ngoại sau
    await queryRunner.query(`
      ALTER TABLE auction_documents
        ADD CONSTRAINT FK_userId FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE;
    `);
    await queryRunner.query(`
      ALTER TABLE auction_documents
        ADD CONSTRAINT FK_sessionId FOREIGN KEY (sessionId) REFERENCES auction_sessions(id) ON DELETE SET NULL ON UPDATE CASCADE;
    `);
    await queryRunner.query(`
      ALTER TABLE auction_documents
        ADD CONSTRAINT FK_categoryId FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE SET NULL ON UPDATE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE auction_documents
        DROP FOREIGN KEY FK_categoryId,
        DROP FOREIGN KEY FK_sessionId,
        DROP FOREIGN KEY FK_userId;
    `);
    await queryRunner.query(`
      ALTER TABLE auction_documents
        DROP COLUMN categoryId,
        DROP COLUMN sessionId,
        DROP COLUMN userId;
    `);
  }
}
