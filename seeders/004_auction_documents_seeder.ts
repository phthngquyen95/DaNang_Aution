import { DataSource } from 'typeorm';
import {
  AuctionDocumentStatus,
  AuctionType,
} from '../src/common/constants/enums';
import { AuctionDocument } from '../src/modules/auction-document/entities/auction-document.entity';
import { User } from '../src/modules/user/entities/user.entity';
import { AuctionSession } from '../src/modules/auction-session/entities/auction-session.entity';
import { Category } from '../src/modules/category/entities/category.entity';
import { encrypt } from '../src/utils/encryption';

export async function seedAuctionDocuments(dataSource: DataSource) {
  const docRepo = dataSource.getRepository(AuctionDocument);
  const userRepo = dataSource.getRepository(User);
  const sessionRepo = dataSource.getRepository(AuctionSession);
  const categoryRepo = dataSource.getRepository(Category);

  const user = await userRepo.findOneBy({ email: encrypt('admin@danang.vn') });
  const session = await sessionRepo.findOneBy({ sessionCode: 'SESSION-001' });
  const category = await categoryRepo.findOneBy({ name: 'Bất động sản' });

  if (!user || !session || !category) {
    console.warn(
      '⚠️ Skipping AuctionDocument seeder (missing user/session/category)',
    );
    return;
  }

  const exists = await docRepo.findOneBy({ documentCode: 'DOC-001' });
  if (!exists) {
    const doc = docRepo.create({
      documentCode: 'DOC-001',
      depositAmount: 10000000,
      isDepositRequired: true,
      status: AuctionDocumentStatus.ACTIVE,
      auctionType: AuctionType.PUBLIC,
      startingPrice: 50000000,
      stepPrice: 1000000,
      registeredAt: new Date(),
      startTime: new Date(Date.now() + 3600 * 1000),
      endTime: new Date(Date.now() + 7200 * 1000),
      description:
        'Tài sản đấu giá là một căn nhà 2 tầng tại trung tâm Đà Nẵng.',
      sessionId: session.id,
      userId: user.id,
      categoryId: category.id,
    });

    await docRepo.save(doc);
    console.log('✅ Seeded 1 auction document');
  }
}
