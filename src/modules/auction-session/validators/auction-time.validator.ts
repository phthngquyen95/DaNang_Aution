// src/validators/auction-time.validator.ts
import { BadRequestException } from '@nestjs/common';

export function validateAuctionTime(startTime?: Date, endTime?: Date): void {
  if (!startTime || !endTime) {
    throw new BadRequestException(
      'Thời gian bắt đầu và kết thúc không được để trống',
    );
  }

  const now = new Date();

  if (startTime.getTime() <= now.getTime()) {
    throw new BadRequestException(
      'Thời gian bắt đầu phải sau thời gian hiện tại',
    );
  }

  if (endTime.getTime() <= startTime.getTime()) {
    throw new BadRequestException(
      'Thời gian kết thúc phải sau thời gian bắt đầu',
    );
  }
}
