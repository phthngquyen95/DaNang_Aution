# Setup Hướng Dẫn - Danang Auction Platform

## Yêu cầu hệ thống
- Node.js (v16 hoặc cao hơn)
- MySQL (v8.0 hoặc cao hơn)
- npm hoặc yarn

## Các bước setup

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Cấu hình môi trường
- Copy file `.env.example` thành `.env`
- Cập nhật các thông tin cấu hình trong file `.env`:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=danang_auction

# Email Configuration (nếu cần)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Google OAuth (nếu cần)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Cloudinary (nếu cần upload ảnh)
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### 3. Setup database và migration
```bash
# Tạo database và chạy migration + seeder
npm run setup

# Hoặc chạy từng bước:
npm run setup:db      # Tạo database
npm run migration:run # Chạy migration
npm run seeder        # Chạy seeder
```

### 4. Chạy ứng dụng

#### Development mode
```bash
npm run start:dev
```

#### Production mode
```bash
npm run build
npm run start:prod
```

### 5. Chạy tests

#### Unit tests
```bash
npm run test
```

#### E2E tests
```bash
npm run test:e2e
```

#### Test coverage
```bash
npm run test:cov
```

## Các lệnh hữu ích

### Migration
```bash
npm run migration:show    # Xem trạng thái migration
npm run migration:revert  # Rollback migration cuối
```

### Development
```bash
npm run start:ts:dev     # Chạy với ts-node-dev (hot reload)
npm run lint             # Kiểm tra code style
npm run format           # Format code
```

## Troubleshooting

### Lỗi kết nối database
- Kiểm tra MySQL service đã chạy chưa
- Kiểm tra thông tin kết nối trong file `.env`
- Đảm bảo user có quyền tạo database

### Lỗi migration
- Kiểm tra database đã được tạo chưa
- Chạy `npm run migration:show` để xem trạng thái

### Port đã được sử dụng
- Thay đổi port trong file `.env` hoặc `src/main.ts`
- Mặc định ứng dụng chạy trên port 3000