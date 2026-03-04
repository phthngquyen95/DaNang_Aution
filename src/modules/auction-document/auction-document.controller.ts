import {
  Get,
  Query,
  Controller,
  Put,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
  Delete,
  UseInterceptors,
  UploadedFiles,
  ParseIntPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuctionDocumentService } from '../auction-document/auction-document.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CreateAuctionDocumentDto } from './dto/create-auction-document.dto';
import { UpdateAuctionDocumentDto } from './dto/update-auction-document.dto';
import { AuthenticatedRequest } from '../../auth/types/authenticated-request.interface';
import { UserRole } from '../../common/constants/enums';
import { Roles } from '../../decorators/role.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { CanUpdateAuctionDocumentGuard } from '../auction-document/guard/can-update-auction-document.guard';
import { AuctionDocumentStatus, AuctionType } from '../../common/constants/enums';
import { Public } from '../../decorators/public.decorator';
import { AssetPublicAccessGuard } from '../../common/for-status/asset-public-access.guard';

@UseGuards(JwtAuthGuard)
@Controller('api')
export class AuctionDocumentController {
  constructor(
    private readonly auctionDocumentService: AuctionDocumentService,
  ) {}

  @Put('admin/assets/:id/review')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRole.ADMIN])
  reviewAsset(
    @Param('id') id: number,
    @Body() body: { action: 'approve' | 'reject'; reason?: string },
  ) {
    return this.auctionDocumentService.reviewAsset(
      +id,
      body.action,
      body.reason,
    );
  }

  // Admin: Lấy danh sách tài sản theo status
  @Get('admin/assets')
  @Roles([UserRole.ADMIN])
  getPendingAssets(@Query('status') status: string) {
    return this.auctionDocumentService.getAssetsByStatus(status);
  }

  // Organizer: Tạo tài sản mới
  @Post('assets')
  @UseGuards(RolesGuard)
  @Roles([UserRole.ORGANIZER])
  create(
    @Body() dto: CreateAuctionDocumentDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.auctionDocumentService.create(dto, req.user);
  }

  @UseGuards(JwtAuthGuard, CanUpdateAuctionDocumentGuard)
  @Put('assets/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAuctionDocumentDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.auctionDocumentService.update(id, dto, req.user);
  }

  @UseGuards(RolesGuard)
  @Roles([UserRole.ORGANIZER, UserRole.ADMIN])
  @Delete('assets/:id')
  remove(@Param('id') id: number, @Request() req: AuthenticatedRequest) {
    return this.auctionDocumentService.remove(id, req.user);
  }

  @Post('assets/:id/images')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadAssetImages(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() files: Express.Multer.File[],
    @Request() req: AuthenticatedRequest,
  ) {
    console.log('Nhận file:', files);
    return this.auctionDocumentService.uploadAssetImages(id, files, req.user);
  }

  @UseGuards(RolesGuard)
  @Roles([UserRole.ORGANIZER, UserRole.ADMIN])
  @Delete('assets/images/:imageId')
  @UseGuards(JwtAuthGuard)
  deleteAssetImage(
    @Param('imageId', ParseIntPipe) imageId: number,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.auctionDocumentService.deleteAssetImage(imageId, req.user);
  }

  @Public()
  @Get('assets')
  @UseGuards(AssetPublicAccessGuard)
  async findAllAssets(
    @Query('status') status?: AuctionDocumentStatus,
    @Query('auction_type') auctionType?: AuctionType,
    @Query('keyword') keyword?: string,
  ) {
    return this.auctionDocumentService.findAssets({
      status,
      auction_type: auctionType,
      keyword,
    });
  }
}
