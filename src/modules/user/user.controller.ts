import {
  Controller,
  Body,
  Param,
  Put,
  Get,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { VerifyUserDto } from './dto/verify-user.dto';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/role.decorator';
import { UserRole } from '../../common/constants/enums';

@Controller('api/admin/users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles([UserRole.ADMIN])
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.userService.findAll(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Put(':id/verify')
  async verifyUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: VerifyUserDto,
  ) {
    return this.userService.verifyUserAccount(id, dto);
  }
}
