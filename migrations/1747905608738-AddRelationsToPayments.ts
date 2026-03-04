import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationsToPayments1747910000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Bước 1: Thêm cột
    await queryRunner.query(`
      ALTER TABLE payments
        ADD COLUMN userId INT,
        ADD COLUMN sessionId INT;
    `);

    // Bước 2: Thêm khoá ngoại
    await queryRunner.query(`
      ALTER TABLE payments
        ADD CONSTRAINT FK_user_payment FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE;
    `);

    await queryRunner.query(`
      ALTER TABLE payments
        ADD CONSTRAINT FK_session_payment FOREIGN KEY (sessionId) REFERENCES auction_sessions(id) ON DELETE SET NULL ON UPDATE CASCADE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE payments
        DROP FOREIGN KEY FK_user_payment,
        DROP FOREIGN KEY FK_session_payment;
    `);
    await queryRunner.query(`
      ALTER TABLE payments
        DROP COLUMN userId,
        DROP COLUMN sessionId;
    `);
  }
}
