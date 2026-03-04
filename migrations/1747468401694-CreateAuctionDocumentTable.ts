import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuctionDocumentTable1747468401694
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE auction_documents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        document_code VARCHAR(255) UNIQUE NOT NULL,
        deposit_amount DECIMAL(15,2),
        deposit_status VARCHAR(255),
        is_deposit_required BOOLEAN DEFAULT TRUE,
        status VARCHAR(255), auction_type VARCHAR(255),
        starting_price DECIMAL(15,2), step_price DECIMAL(15,2),
        registered_at DATETIME,
        start_time DATETIME,
        end_time DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        user_id INT, session_id INT, category_id INT,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (session_id) REFERENCES auction_sessions(id),
        FOREIGN KEY (category_id) REFERENCES categories(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE auction_documents`);
  }
}
