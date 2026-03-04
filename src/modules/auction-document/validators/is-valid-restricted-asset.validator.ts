import { AuctionType } from '../../../common/constants/enums';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { UserRole } from '../../../common/constants/enums';

export function validateAuctionType(dto: any, role?: string) {
  // Nếu người dùng không phải organizer mà chọn PRIVATE thì không cho phép
  if (
    dto.auction_type &&
    dto.auction_type === AuctionType.PRIVATE &&
    role !== UserRole.ORGANIZER
  ) {
    throw new ForbiddenException(
      'Chỉ người tổ chức mới được chọn chế độ PRIVATE.',
    );
  }

  // Nếu nhập sai auction_type (không phải PUBLIC hoặc PRIVATE) thì báo lỗi
  if (
    dto.auction_type &&
    !(
      typeof dto.auction_type === 'string' &&
      [AuctionType.PUBLIC, AuctionType.PRIVATE].includes(
        dto.auction_type as AuctionType,
      )
    )
  ) {
    throw new BadRequestException('auction_type không hợp lệ');
  }
}
