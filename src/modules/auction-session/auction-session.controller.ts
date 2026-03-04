import { Controller } from '@nestjs/common';
import { AuctionSessionService } from './auction-session.service';

@Controller('auction-session')
export class AuctionSessionController {
  constructor(private readonly auctionSessionService: AuctionSessionService) {}
}
