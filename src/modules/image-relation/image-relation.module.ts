import { Module } from '@nestjs/common';
import { ImageRelationService } from './image-relation.service';
import { ImageRelationController } from './image-relation.controller';

@Module({
  controllers: [ImageRelationController],
  providers: [ImageRelationService],
})
export class ImageRelationModule {}
