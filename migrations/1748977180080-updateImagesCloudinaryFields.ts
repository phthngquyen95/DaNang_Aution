import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateImagesCloudinaryFields1748977180080
  implements MigrationInterface
{
  name = 'UpdateImagesCloudinaryFields1748977180080';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('images', [
      new TableColumn({
        name: 'url',
        type: 'text',
        isNullable: true,
      }),
      new TableColumn({
        name: 'public_id',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'type',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'size',
        type: 'int',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('images', [
      'url',
      'public_id',
      'type',
      'size',
    ]);
  }
}
