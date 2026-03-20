import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserStatus } from '../../common/constants/enums';
import { VerifyUserDto, VerifyStatus } from './dto/verify-user.dto';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private mailService: MailService,
  ) {}

  async findAll(page: number = 1, limit: number = 20) {
    const [users, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data: users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }
    return user;
  }

  async verifyUserAccount(id: number, dto: VerifyUserDto) {
    this.logger.log(
      `Bắt đầu xử lý xác minh user ID=${id} với trạng thái ${dto.status}`,
    );

    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      this.logger.warn(`Không tìm thấy user ID=${id}`);
      throw new NotFoundException('Người dùng không tồn tại');
    }

    if (user.status !== UserStatus.ACTIVE) {
      this.logger.warn(`User ID=${id} đang bị khóa hoặc không hợp lệ`);
      throw new BadRequestException(
        'Người dùng đang bị khóa hoặc không hợp lệ',
      );
    }

    if (user.verified) {
      this.logger.warn(`User ID=${id} đã được xác minh trước đó`);
      throw new BadRequestException('Người dùng đã được xác minh');
    }

    if (dto.status === VerifyStatus.VERIFIED) {
      return this.verifyUser(id);
    }

    if (dto.status === VerifyStatus.REJECTED) {
      if (!dto.reason) {
        this.logger.warn(`User ID=${id} bị từ chối nhưng thiếu lý do`);
        throw new BadRequestException('Lý do từ chối là bắt buộc');
      }
      return this.rejectUser(id, dto.reason);
    }

    this.logger.log(
      `Bắt đầu xử lý xác minh user ID=${id} với trạng thái ${String(dto.status)}`,
    );
    throw new BadRequestException('Trạng thái không hợp lệ');
  }

  private async verifyUser(id: number) {
    this.logger.log(`Xác minh user ID=${id}`);

    await this.userRepository.update(id, {
      verified: true,
      verifiedAt: new Date(),
      rejectedReason: undefined,
    });

    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      this.logger.error(`User ID=${id} không tồn tại sau khi cập nhật`);
      throw new NotFoundException('Người dùng không tồn tại');
    }

    await this.mailService.sendUserVerificationSuccess(user.email);

    this.logger.log(`Xác minh thành công cho user ID=${id}`);
    return { message: 'Xác minh người dùng thành công' };
  }

  private async rejectUser(id: number, reason: string) {
    this.logger.log(`Từ chối xác minh user ID=${id}, lý do: ${reason}`);

    await this.userRepository.update(id, {
      verified: false,
      rejectedReason: reason,
    });

    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      this.logger.error(`User ID=${id} không tồn tại sau khi từ chối`);
      throw new NotFoundException('Người dùng không tồn tại');
    }

    await this.mailService.sendUserRejectionNotice(user.email, reason);

    this.logger.log(`Từ chối thành công user ID=${id}`);
    return { message: 'Từ chối người dùng thành công' };
  }
}
