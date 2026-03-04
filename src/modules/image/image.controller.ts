import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Req,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { ImagesService } from './image.service';
import { Request } from 'express';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';

@Controller('auth')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload-cccd')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'avatarBack', maxCount: 1 },
    ]),
  )
  async uploadCCCDImages(
    @Req() req: Request,
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
      avatarBack?: Express.Multer.File[];
    },
  ) {
    const user = req.user as JwtPayload;
    const userId = user.sub;

    const result: any = {};

    if (files.avatar?.[0]) {
      result.front = await this.imagesService.storeCloudinaryImageTemp(
        userId.toString(),
        files.avatar[0],
        'front',
      );
    }

    if (files.avatarBack?.[0]) {
      result.back = await this.imagesService.storeCloudinaryImageTemp(
        userId.toString(),
        files.avatarBack[0],
        'back',
      );
    }

    return result;
  }
}
