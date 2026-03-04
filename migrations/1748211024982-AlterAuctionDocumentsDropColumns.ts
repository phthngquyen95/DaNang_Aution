import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterAuctionDocumentsDropColumns1748211024982
  implements MigrationInterface
{
  name = 'AlterAuctionDocumentsDropColumns1748211024982';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`auction_documents\` DROP FOREIGN KEY \`FK_userId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`auction_documents\` DROP FOREIGN KEY \`FK_sessionId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`auction_documents\` DROP FOREIGN KEY \`FK_categoryId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`auction_documents\` DROP \`userId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`auction_documents\` DROP \`sessionId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`auction_documents\` DROP \`categoryId\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`auction_documents\` ADD \`categoryId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`auction_documents\` ADD \`sessionId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`auction_documents\` ADD \`userId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`auction_documents\` ADD CONSTRAINT \`FK_categoryId\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`auction_documents\` ADD CONSTRAINT \`FK_sessionId\` FOREIGN KEY (\`sessionId\`) REFERENCES \`auction_sessions\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`auction_documents\` ADD CONSTRAINT \`FK_userId\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }
}
