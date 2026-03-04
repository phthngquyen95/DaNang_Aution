import {
  Controller,
  Body,
  Param,
  Put,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { VerifyUserDto } from './dto/verify-user.dto';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/role.decorator';
import { UserRole } from '../../common/constants/enums';

@Controller('api/admin/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put(':id/verify')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([UserRole.ADMIN]) //Decorator @Roles được bạn định nghĩa có khả năng yêu cầu một danh sách role
  async verifyUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: VerifyUserDto,
  ) {
    return this.userService.verifyUserAccount(id, dto);
  }
}
