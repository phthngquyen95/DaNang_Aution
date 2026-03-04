import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtPayload } from 'jsonwebtoken';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from '../interfaces/request-with-user';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(FilesInterceptor('files', 2)) // dùng cho nhiều file, tên key là 'files'
  async register(
    @Body() dto: RegisterDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.authService.register(dto, files);
  }

  @Post('login')
  async login(@Body() dto: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      dto.username,
      dto.password,
    );
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user as JwtPayload;
  }

  @Post('logout')
  logout() {
    return { message: 'Logout successful (handled client-side)' };
  }

  @Post('forget-password')
  forgetPassword(@Body() dto: ForgetPasswordDto) {
    return this.authService.sendOtp(dto.email);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleCallback(@Req() req: RequestWithUser) {
    return this.authService.loginWithGoogle(req.user);
  }
}
