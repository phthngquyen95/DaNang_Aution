import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePaymentsTable1747468451035 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(255) NOT NULL,
        status VARCHAR(255) NOT NULL,
        price DECIMAL(15,2) NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        user_id INT, session_id INT,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (session_id) REFERENCES auction_sessions(id)
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE payments`);
  }
}
