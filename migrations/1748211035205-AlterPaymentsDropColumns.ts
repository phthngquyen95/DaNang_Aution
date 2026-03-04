import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterPaymentsDropColumns1748211035205
  implements MigrationInterface
{
  name = 'AlterPaymentsDropColumns1748211035205';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_user_payment\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_session_payment\``,
    );
    await queryRunner.query(`ALTER TABLE \`payments\` DROP \`userId\``);
    await queryRunner.query(`ALTER TABLE \`payments\` DROP \`sessionId\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD \`sessionId\` int NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`payments\` ADD \`userId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_session_payment\` FOREIGN KEY (\`sessionId\`) REFERENCES \`auction_sessions\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_user_payment\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }
}
