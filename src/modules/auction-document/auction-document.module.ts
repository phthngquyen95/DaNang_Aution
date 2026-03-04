// src/modules/auction-document/auction-document.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionDocument } from './entities/auction-document.entity';
import { AuctionDocumentService } from './auction-document.service';
import { AuctionDocumentController } from './auction-document.controller';
import { IsOrganizerConstraint } from './validators/is-organizer.validator';
import { AuctionSession } from '../auction-session/entities/auction-session.entity';
import { User } from '../user/entities/user.entity';
import { Image } from '../image/entities/image.entity';
import { ImageRelation } from '../image-relation/entities/image-relation.entity';
import { ImageModule } from '../image/image.module';
import { CanUpdateAuctionDocumentGuard } from '../auction-document/guard/can-update-auction-document.guard';
import { MailModule } from '../../mail/mail.module';
import { AuctionSessionModule } from '../auction-session/auction-session.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuctionDocument,
      Image,
      ImageRelation,
      AuctionSession,
      User,
    ]),
    MailModule,
    ImageModule,
    MailModule,
    AuctionSessionModule,
  ],
  controllers: [AuctionDocumentController],
  providers: [
    AuctionDocumentService,
    IsOrganizerConstraint,
    CanUpdateAuctionDocumentGuard,
  ],
})
export class AuctionDocumentModule {}
