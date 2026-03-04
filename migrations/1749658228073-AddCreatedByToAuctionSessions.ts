import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCreatedByToAuctionSessions1749658228073
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'auction_sessions',
      new TableColumn({
        name: 'created_by',
        type: 'int',
        isNullable: true, // hoặc false nếu bạn muốn bắt buộc
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('auction_sessions', 'created_by');
  }
}
