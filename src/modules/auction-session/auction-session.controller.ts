import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AuctionSessionService } from './auction-session.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuctionSession } from './entities/auction-session.entity';

@Controller('auction-session')
export class AuctionSessionController {
  constructor(
    private readonly auctionSessionService: AuctionSessionService,
    @InjectRepository(AuctionSession)
    private readonly sessionRepository: Repository<AuctionSession>,
  ) {}

  @Get()
  async findAll() {
    return this.sessionRepository.find({
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sessionRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });
  }
}
