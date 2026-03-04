import { DataSource } from 'typeorm';
import {
  AuctionDocumentStatus,
  AuctionType,
} from '../src/common/constants/enums';
import { AuctionSession } from '../src/modules/auction-session/entities/auction-session.entity';

export async function seedAuctionSessions(dataSource: DataSource) {
  const repo = dataSource.getRepository(AuctionSession);

  const sessionCode = 'SESSION-001';
  const existing = await repo.findOneBy({ sessionCode: sessionCode });

  if (!existing) {
    const session = repo.create({
      sessionCode: sessionCode,
      title: 'Phiên đấu giá đầu tiên',
      description: 'Mô tả phiên đấu giá mẫu',
      status: AuctionDocumentStatus.UPCOMING,
      type: AuctionType.PUBLIC,
    });

    await repo.save(session);
    console.log('✅ Seeded auction session');
  }
}
