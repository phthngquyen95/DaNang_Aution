import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import { addMinutes } from 'date-fns';

import { UserRole, AccountType, UserStatus } from '../common/constants/enums';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailService } from '../mail/mail.service';
import { encrypt } from '../utils/encryption';
import { ImagesService } from '../modules/image/image.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from '../modules/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly imagesService: ImagesService,
  ) {}

  async register(dto: RegisterDto, files: Express.Multer.File[]) {
    const existing = await this.userRepository.findOneBy({
      username: dto.username,
    });

    if (existing) {
      throw new BadRequestException('Tên đăng nhập đã tồn tại');
    }
    if (!dto.password) throw new BadRequestException('Mật khẩu là bắt buộc');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const existingEmail = await this.userRepository.findOneBy({
      email: dto.email,
    });

    if (existingEmail) {
      throw new BadRequestException('Email đã tồn tại');
    }

    const user = this.userRepository.create({
      username: dto.username,
      password: hashedPassword,
      email: dto.email,
      phoneNumber: dto.phone_number ? encrypt(dto.phone_number) : undefined,
      firstName: dto.first_name,
      middleName: dto.middle_name,
      lastName: dto.last_name,
      gender: dto.gender,
      dob: dto.dob,
      province: dto.province,
      district: dto.district,
      ward: dto.ward,
      detailedAddress: dto.detailed_address,
      identityNumber: dto.identity_number
        ? encrypt(dto.identity_number)
        : undefined,
      identityIssueDate: dto.identity_issue_date,
      identityIssuePlace: dto.identity_issue_place,
      bankAccountNumber: dto.bank_account_number,
      bankName: dto.bank_name,
      bankAccountHolder: dto.bank_account_holder,
      accountType: dto.account_type ?? AccountType.PERSONAL,
      role: dto.role ?? UserRole.BIDDER,
      verified: false,
      status: UserStatus.ACTIVE,
    });

    const savedUser = await this.userRepository.save(user);

    let identityFrontUrl: string | undefined;
    let identityBackUrl: string | undefined;

    // Gán ảnh mặt trước nếu có
    if (files[0]) {
      const result = await this.imagesService.storeCloudinaryImageTemp(
        savedUser.id.toString(),
        files[0],
        'front',
      );
      identityFrontUrl = result.url;
    }

    // Gán ảnh mặt sau nếu có
    if (files[1]) {
      const result = await this.imagesService.storeCloudinaryImageTemp(
        savedUser.id.toString(),
        files[1],
        'back',
      );
      identityBackUrl = result.url;
    }

    // Cập nhật URL ảnh vào bảng users
    await this.userRepository.update(savedUser.id, {
      identityFrontUrl,
      identityBackUrl,
    });

    return { message: 'Đăng ký thành công', savedUser };
  }

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.findOneBy({ username });

    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Mật khẩu không đúng');
    }

    return user;
  }

  login(user: { id: number; username: string; role: string }) {
    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      jti: uuid.v4(),
    };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }

  async sendOtp(email: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('Email không tồn tại trong hệ thống');
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt: Date = new Date(addMinutes(new Date(), 10).getTime());

    user.resetToken = otpCode;
    user.resetTokenExpiry = expiresAt;
    await this.userRepository.save(user);

    await this.mailService.sendOtp(email, otpCode);

    console.log(`[DEBUG] OTP gửi đến ${email}: ${otpCode}`);
    return { message: 'Mã OTP đã được gửi tới email của bạn' };
  }

  async resetPassword(dto: ResetPasswordDto): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!user || !user.resetToken || !user.resetTokenExpiry) {
      throw new BadRequestException('Không thể đặt lại mật khẩu: Thiếu mã OTP');
    }

    if (user.resetToken !== dto.otp) {
      throw new BadRequestException('Mã OTP không chính xác');
    }

    if (user.resetTokenExpiry < new Date()) {
      throw new BadRequestException('Mã OTP đã hết hạn');
    }

    const newHashedPassword = await bcrypt.hash(dto.newPassword, 10);

    user.password = newHashedPassword;
    user.resetToken = '';
    user.resetTokenExpiry = null;

    await this.userRepository.save(user);

    return { message: 'Đặt lại mật khẩu thành công!' };
  }

  async loginWithGoogle(googleUser: any) {
    let user = await this.userRepository.findOne({
      where: { email: googleUser.email },
    });

    if (!user) {
      const tempPassword = await bcrypt.hash(
        Math.random().toString(36).slice(-8),
        10,
      );

      user = this.userRepository.create({
        email: googleUser.email,
        username: googleUser.email.split('@')[0],
        password: tempPassword,
        firstName: googleUser.firstName,
        lastName: googleUser.lastName,
        role: UserRole.BIDDER,
        accountType: AccountType.PERSONAL,
        status: UserStatus.ACTIVE,
        verified: true,
      });

      await this.userRepository.save(user);
    }

    const payload = { sub: user.id, username: user.username };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
