import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateImageRelationTable1747468514945
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE image_relation (
        image_id INT NOT NULL,
        image_fk_id INT NOT NULL,
        type VARCHAR(50) NOT NULL,
        PRIMARY KEY (image_id, image_fk_id, type), FOREIGN KEY (image_id) REFERENCES images(id)
        ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE image_relation;
  `);
  }
}
