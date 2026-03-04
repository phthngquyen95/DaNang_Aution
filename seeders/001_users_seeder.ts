import { DataSource, DeepPartial } from 'typeorm';
import {
  UserStatus,
  Gender,
  AccountType,
  UserRole,
} from '../src/common/constants/enums';
import { User } from '../src/modules/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { encrypt } from '../src/utils/encryption';

export async function seedAdminUser(dataSource: DataSource) {
  const repo = dataSource.getRepository(User);
  const encryptedEmail = encrypt('admin@danang.vn');

  let admin = await repo.findOneBy({ email: encryptedEmail });

  const commonData: DeepPartial<User> = {
    username: 'admin',
    password: await bcrypt.hash('admin123', 10),
    email: encryptedEmail,
    phoneNumber: encrypt('0901234567'),
    firstName: 'Admin',
    middleName: '',
    lastName: 'Đà Nẵng',
    gender: Gender.OTHER,
    dob: '1990-01-01',
    province: 'Đà Nẵng',
    district: 'Hải Châu',
    ward: 'Hòa Cường Bắc',
    detailedAddress: '123 Lê Duẩn',
    identityNumber: encrypt('012345678901'),
    identityIssueDate: '2010-01-01',
    identityIssuePlace: 'Công an Đà Nẵng',
    bankAccountNumber: '0123456789',
    bankName: 'Ngân hàng Đà Nẵng',
    bankAccountHolder: 'Admin Đà Nẵng',
    accountType: AccountType.PERSONAL,
    verified: true,
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
    resetToken: undefined,
    resetTokenExpiry: undefined,
    identityFrontUrl:
      'https://res.cloudinary.com/demo/image/upload/v1234567890/cccd/front.jpg',
    identityBackUrl:
      'https://res.cloudinary.com/demo/image/upload/v1234567890/cccd/back.jpg',
  };

  if (!admin) {
    admin = repo.create(commonData);
  } else {
    Object.assign(admin, commonData);
  }

  await repo.save(admin);
  console.log('✅ Admin user seeded or updated with full profile');
}
