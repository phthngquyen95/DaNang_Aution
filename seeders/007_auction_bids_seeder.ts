import { DataSource } from 'typeorm';
import { AuctionBid } from '../src/modules/auction-bid/entities/auction-bid.entity';
import { User } from '../src/modules/user/entities/user.entity';
import { AuctionSession } from '../src/modules/auction-session/entities/auction-session.entity';
import { encrypt } from '../src/utils/encryption';

export async function seedAuctionBids(dataSource: DataSource) {
  const repo = dataSource.getRepository(AuctionBid);
  const userRepo = dataSource.getRepository(User);
  const sessionRepo = dataSource.getRepository(AuctionSession);

  const user = await userRepo.findOneBy({ email: encrypt('admin@danang.vn') });
  const session = await sessionRepo.findOneBy({ sessionCode: 'SESSION-001' });

  if (!user || !session) {
    console.warn('⚠️ Skipping auction bid seeder (missing user/session)');
    return;
  }

  const exists = await repo.findOne({
    where: {
      user: { id: user.id },
      session: { id: session.id },
    },
  });

  if (!exists) {
    const bid = repo.create({
      price: 51000000,
      user: user,
      session: session,
    });

    await repo.save(bid);
    console.log('✅ Seeded 1 auction bid');
  }
}
