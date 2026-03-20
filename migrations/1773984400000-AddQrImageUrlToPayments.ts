import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddQrImageUrlToPayments1773984400000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'payments',
      new TableColumn({
        name: 'qr_image_url',
        type: 'text',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('payments', 'qr_image_url');
  }
}
