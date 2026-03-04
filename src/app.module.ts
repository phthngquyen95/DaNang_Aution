import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
// Boostrap
import configureDatabase from './bootstrap/database';
import configureMulter from './bootstrap/fileUpload';
import { ImagesController } from './modules/images/images.controller';
import { AuthModule } from './auth/auth.module';
import { ImageModule } from './modules/image/image.module';
import { ImageRelationModule } from './modules/image-relation/image-relation.module';
import { UserModule } from './modules/user/user.module';
import { AuctionDocumentModule } from './modules/auction-document/auction-document.module';
import { PaymentModule } from './modules/payment/payment.module';
import { AuctionBidModule } from './modules/auction-bid/auction-bid.module';
import { AuctionSessionModule } from './modules/auction-session/auction-session.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    ScheduleModule.forRoot(),
    configureDatabase(),
    configureMulter(),
    AuthModule,
    ImageModule,
    ImageRelationModule,
    UserModule,
    AuctionDocumentModule,
    PaymentModule,
    AuctionBidModule,
    AuctionSessionModule,
  ],
  controllers: [ImagesController],
})
export class AppModule {}
