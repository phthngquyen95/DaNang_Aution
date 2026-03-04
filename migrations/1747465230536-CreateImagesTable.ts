import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateImagesTable1747465230536 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        file_path TEXT NOT NULL,
        file_name VARCHAR(255) NOT NULL,
        file_extension VARCHAR(10) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE images
    `);
  }
}
