import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewColumn1748102086566 implements MigrationInterface {
  name = 'AddNewColumn1748102086566';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE auction_sessions
        MODIFY COLUMN status ENUM('upcoming', 'active', 'completed', 'cancelled') DEFAULT 'upcoming',
        MODIFY COLUMN type ENUM('public', 'private', 'restricted') DEFAULT 'public';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE auction_sessions
        MODIFY COLUMN status ENUM('upcoming', 'active', 'completed') DEFAULT 'upcoming',
        MODIFY COLUMN type ENUM('public', 'private') DEFAULT 'public';
    `);
  }
}
