// src/common/constants/enums.ts
export enum AuctionDocumentStatus {
  PENDING_CREATE = 'pending_create', // Đang soạn
  PENDING_APPROVAL = 'pending_approval', // Chờ duyệt
  UPCOMING = 'upcoming', // Sắp diễn ra
  ACTIVE = 'active', // Đang đấu giá
  COMPLETED = 'completed',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

export enum AuctionType {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export enum DepositStatus {
  PENDING = 'pending',
  PAID = 'paid',
  REFUNDED = 'refunded',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
}

export enum UserStatus {
  ACTIVE = 'active',
  BANNED = 'banned',
  SUSPENDED = 'suspended',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum UserRole {
  BIDDER = 'bidder',
  ORGANIZER = 'organizer',
  ADMIN = 'admin',
}

export enum AccountType {
  PERSONAL = 'personal',
  ORGANIZATION = 'organization',
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum PaymentType {
  DEPOSIT = 'deposit',
  REFUND = 'refund',
  FINAL = 'final',
}

export enum ImageRelationType {
  AUCTION = 'auction',
  ASSET = 'asset',
}

export enum AuctionParticipantStatus {
  NEW = 'new', // Mới đăng ký
  APPROVED = 'approved', // Được duyệt
  REJECTED = 'rejected', // Bị từ chối
  REFUNDED = 'refunded', // Đã hoàn tiền cọc
}

// Alias for backward compatibility
export const ParticipantStatus = AuctionParticipantStatus;

export enum AuctionSessionStatus {
  DRAFT = 'draft', // Người tổ chức khởi tạo
  PENDING = 'pending', // Đang chờ admin duyệt
  APPROVED = 'approved', // Đã được admin duyệt
  RUNNING = 'running', // Đang diễn ra (đặt giá được)
  FINISHED = 'finished', // Đã kết thúc (xác định người thắng)
  CANCELLED = 'cancelled',
}
