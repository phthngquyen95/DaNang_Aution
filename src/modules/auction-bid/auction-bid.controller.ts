import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  Request,
  Query,
} from '@nestjs/common';
import { AuctionBidService } from './auction-bid.service';
import { CreateAuctionBidDto } from './dto/create-auction-bid.dto';
import { RolesGuard } from '../../guards/roles.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { Roles } from '../../decorators/role.decorator';
import { UserRole } from '../../common/constants/enums';

@Controller('api/sessions')
export class AuctionBidController {
  constructor(private readonly auctionBidService: AuctionBidService) {}

  @Get(':id/bids')
  async getBids(
    @Param('id', ParseIntPipe) sessionId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.auctionBidService.getBidsBySession(sessionId, page, limit);
  }

  //API thực hiện trả giá
  @Post(':id/bids')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRole.BIDDER])
  async submitBidManually(
    @Param('id', ParseIntPipe) sessionId: number,
    @Body() dto: CreateAuctionBidDto,
    @Request() req: any,
  ) {
    const userId = Number(req.user.id);
    return this.auctionBidService.submitBidManually(
      sessionId,
      userId,
      dto.price,
    );
  }
}
