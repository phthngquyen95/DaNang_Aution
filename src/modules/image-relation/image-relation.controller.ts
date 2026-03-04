import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ImageRelationService } from './image-relation.service';
import { CreateImageRelationDto } from './dto/create-image-relation.dto';
import { UpdateImageRelationDto } from './dto/update-image-relation.dto';

@Controller('image-relation')
export class ImageRelationController {
  constructor(private readonly imageRelationService: ImageRelationService) {}

  @Post()
  create(@Body() createImageRelationDto: CreateImageRelationDto) {
    return this.imageRelationService.create(createImageRelationDto);
  }

  @Get()
  findAll() {
    return this.imageRelationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageRelationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateImageRelationDto: UpdateImageRelationDto,
  ) {
    return this.imageRelationService.update(+id, updateImageRelationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageRelationService.remove(+id);
  }
}
