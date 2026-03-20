import { DataSource } from 'typeorm';
import { Payment } from '../src/modules/payment/entities/payment.entity';
import { User } from '../src/modules/user/entities/user.entity';
import { AuctionSession } from '../src/modules/auction-session/entities/auction-session.entity';
import { encrypt } from '../src/utils/encryption';
import { PaymentStatus, PaymentType } from '../src/common/constants/enums';

export async function seedPayments(dataSource: DataSource) {
  const repo = dataSource.getRepository(Payment);
  const userRepo = dataSource.getRepository(User);
  const sessionRepo = dataSource.getRepository(AuctionSession);

  const user = await userRepo.findOneBy({ email: encrypt('admin@danang.vn') });
  const session = await sessionRepo.findOneBy({ sessionCode: 'SESSION-001' });

  if (!user || !session) {
    console.warn('⚠️ Skipping payments seeder (missing user/session)');
    return;
  }

  const exists = await repo.findOneBy({
    userId: user.id,
    sessionId: session.id,
  });

  if (!exists) {
    const payment = repo.create({
      type: PaymentType.DEPOSIT,
      status: PaymentStatus.COMPLETED,
      price: 1000000,
      userId: user.id,
      sessionId: session.id,
    });

    await repo.save(payment);
    console.log('✅ Seeded 1 payment');
  }
}
