import { DataSource } from 'typeorm';
import {
  ParticipantStatus,
  DepositStatus,
} from '../src/common/constants/enums';
import { AuctionSessionParticipant } from '../src/modules/auction-session-participant/entities/auction-session-participant.entity';
import { User } from '../src/modules/user/entities/user.entity';
import { AuctionSession } from '../src/modules/auction-session/entities/auction-session.entity';
import { encrypt } from '../src/utils/encryption';

export async function seedParticipants(dataSource: DataSource) {
  const repo = dataSource.getRepository(AuctionSessionParticipant);
  const userRepo = dataSource.getRepository(User);
  const sessionRepo = dataSource.getRepository(AuctionSession);

  const encryptedEmail = encrypt('admin@danang.vn');
  const user = await userRepo.findOneBy({ email: encryptedEmail });
  const session = await sessionRepo.findOneBy({ sessionCode: 'SESSION-001' });

  if (!user || !session) {
    console.warn('⚠️ Skipping participants seeder (missing user/session)');
    return;
  }

  const exists = await repo.findOneBy({
    userId: user.id,
    auctionSessionId: session.id,
  });

  if (!exists) {
    const participant = repo.create({
      userId: user.id,
      auctionSessionId: session.id,
      role: 'bidder',
      status: ParticipantStatus.NEW,
      depositStatus: DepositStatus.PENDING,
    });

    await repo.save(participant);
    console.log('✅ Seeded 1 session participant with status NEW');
  }
}
