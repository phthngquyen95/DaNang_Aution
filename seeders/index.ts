import { AppDataSource } from '../ormconfig'; // ← phải dùng đúng tên

import { seedAdminUser } from './001_users_seeder';
import { seedCategories } from './002_categories_seeder';
import { seedAuctionSessions } from './003_auction_sessions_seeder';
import { seedAuctionDocuments } from './004_auction_documents_seeder';
import { seedParticipants } from './005_auction_participants_seeder';
import { seedPayments } from './006_payments_seeder';
import { seedAuctionBids } from './007_auction_bids_seeder';

async function runSeeders() {
  await AppDataSource.initialize();
  await seedAdminUser(AppDataSource);
  await seedCategories(AppDataSource);
  await seedAuctionSessions(AppDataSource);
  await seedAuctionDocuments(AppDataSource);
  await seedParticipants(AppDataSource);
  await seedPayments(AppDataSource);
  await seedAuctionBids(AppDataSource);
  await AppDataSource.destroy();
  console.log('✅ Seeding completed.');
}

runSeeders().catch((err) => {
  console.error('❌ Seeder error:', err);
  AppDataSource.destroy();
});
