import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ImagesService } from './image.service';
import { CloudinaryStorageEngine } from '../../bootstrap/cloudinary-storage';

@Module({
  imports: [
    MulterModule.register({
      storage: CloudinaryStorageEngine,
    }),
  ],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImageModule {}
