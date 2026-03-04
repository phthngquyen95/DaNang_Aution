import {
  Controller,
  Param,
  Put,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
import { AuctionSessionParticipantService } from './auction-session-participant.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/role.decorator';
import { UserRole } from 'common/constants/enums';

@Controller('api/auction-session-participant')
export class AuctionSessionParticipantController {
  constructor(
    private readonly auctionSessionParticipantService: AuctionSessionParticipantService,
  ) {}

  //DUYỆT HỒ SƠ THAM GIA PHIÊN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRole.ORGANIZER])
  @Put('/sessions/:sessionId/participations/:participantId/approve')
  approveParticipation(
    @Param('sessionId') sessionId: number,
    @Param('participantId') participantId: number,
    @Request() req: any,
  ) {
    return this.auctionSessionParticipantService.approve(
      +sessionId,
      +participantId,
      Number(req.user.id),
    );
  }

  //Gửi hồ sơ tham gia đấu giá (bidder)
  @UseGuards(JwtAuthGuard)
  @Roles([UserRole.BIDDER, UserRole.ORGANIZER])
  @Post('/sessions/:sessionId/participations')
  submitParticipation(
    @Request() req: any,
    @Param('sessionId') sessionId: number,
  ) {
    return this.auctionSessionParticipantService.submitParticipation(
      Number(req.user.id),
      +sessionId,
    );
  }
}
