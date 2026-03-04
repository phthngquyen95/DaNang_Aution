/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateImageRelationDto } from './dto/create-image-relation.dto';
import { UpdateImageRelationDto } from './dto/update-image-relation.dto';

@Injectable()
export class ImageRelationService {
  create(createImageRelationDto: CreateImageRelationDto) {
    return 'This action adds a new imageRelation';
  }

  findAll() {
    return `This action returns all imageRelation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imageRelation`;
  }

  update(id: number, updateImageRelationDto: UpdateImageRelationDto) {
    return `This action updates a #${id} imageRelation`;
  }

  remove(id: number) {
    return `This action removes a #${id} imageRelation`;
  }
}
