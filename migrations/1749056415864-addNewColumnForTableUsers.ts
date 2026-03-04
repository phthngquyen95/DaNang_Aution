import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddNewColumnForTableUsers1749056415864
  implements MigrationInterface
{
  name = 'AddNewColumnForTableUsers1749056415864';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'identity_front_url',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'identity_back_url',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'identity_front_url');
    await queryRunner.dropColumn('users', 'identity_back_url');
  }
}
