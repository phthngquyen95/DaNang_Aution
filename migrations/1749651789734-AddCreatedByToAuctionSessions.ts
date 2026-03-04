import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedByToAuctionSessions1749651789734 implements MigrationInterface {
    name = 'AddCreatedByToAuctionSessions1749651789734'
   public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE auction_sessions
      ADD COLUMN created_by INT,
      ADD CONSTRAINT FK_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE auction_sessions
      DROP FOREIGN KEY FK_created_by,
      DROP COLUMN created_by
    `);
  }
}

