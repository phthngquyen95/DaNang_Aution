import { MigrationInterface, QueryRunner } from 'typeorm';

export class MoveDepositStatusToParticipants1748539008029
  implements MigrationInterface
{
  name = 'MoveDepositStatusToParticipants1748539008029';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE auction_documents DROP COLUMN deposit_status`,
    );

    await queryRunner.query(
      `ALTER TABLE auction_session_participants
       ADD COLUMN deposit_status ENUM('pending', 'paid', 'refunded', 'failed')
       NOT NULL DEFAULT 'pending'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE auction_session_participants DROP COLUMN deposit_status`,
    );

    await queryRunner.query(
      `ALTER TABLE auction_documents
       ADD COLUMN deposit_status ENUM('pending', 'paid', 'refunded', 'failed')
       NOT NULL DEFAULT 'pending'`,
    );
  }
}
