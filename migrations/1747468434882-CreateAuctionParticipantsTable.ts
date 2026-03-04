import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuctionParticipantsTable1747468434882
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE auction_session_participants (
        user_id INT NOT NULL,
        auction_session_id INT NOT NULL,
        role VARCHAR(255) NOT NULL,
        status ENUM('NEW', 'DEPOSITED', 'REFUNDED', 'REJECTED') DEFAULT 'NEW',
        PRIMARY KEY (user_id, auction_session_id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (auction_session_id) REFERENCES auction_sessions(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE auction_session_participants;
    `);
  }
}
