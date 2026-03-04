import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuctionSessionTable1747468366807
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE auction_sessions (
        id INT NOT NULL AUTO_INCREMENT,
        session_code VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255),
        status VARCHAR(255) DEFAULT 'upcoming',
        type VARCHAR(255) DEFAULT 'public',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS auction_sessions`);
  }
}
