# Frontend Setup - Đấu Giá Lạc Việt

## ✅ Đã hoàn thành

Đã tạo thành công Landing Page với React + TypeScript + Tailwind CSS v3

### Cấu trúc dự án

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.tsx           # Header với navigation và đồng hồ
│   │   ├── HeroSection.tsx      # Hero section với app showcase
│   │   ├── AuctionCard.tsx      # Card component cho tài sản
│   │   ├── AuctionSection.tsx   # Danh sách tài sản đã/sắp đấu giá
│   │   ├── NewsSection.tsx      # Tin tức & thông báo
│   │   ├── PartnersSection.tsx  # Đối tác tiêu biểu
│   │   └── Footer.tsx           # Footer với form đăng ký
│   ├── lib/
│   │   └── utils.ts             # Utility functions
│   ├── App.tsx                  # Main component
│   ├── index.css                # Tailwind imports
│   └── index.tsx
├── tailwind.config.js
├── postcss.config.js
├── craco.config.js
└── package.json
```

### Công nghệ

- ✅ React 19 + TypeScript
- ✅ Tailwind CSS v3
- ✅ Lucide React (icons)
- ✅ CRACO (config override)
- ✅ Responsive design

### Chạy dự án

```bash
cd frontend
npm start
```

Mở http://localhost:3001 (hoặc port được chỉ định)

### Tính năng đã implement

1. **Header**
   - Logo Đấu Giá Lạc Việt
   - Navigation menu với dropdown
   - Đồng hồ thời gian thực
   - Chuyển đổi ngôn ngữ (VI)
   - Nút tìm kiếm
   - Nút đăng nhập

2. **Hero Section**
   - Tiêu đề chính
   - Mô tả về công ty
   - Nút CTA "Khám phá"
   - App showcase với mockup điện thoại
   - Background decorative elements

3. **Auction Section**
   - Tài sản đã đấu giá (4 cards)
   - Tài sản sắp được đấu giá (4 cards)
   - Hiển thị giá khởi điểm
   - Thời gian kết thúc
   - Nút "Chi tiết" và "Share"
   - Nút "Xem tất cả"

4. **News Section**
   - 4 tin tức mới nhất
   - Hiển thị ngày đăng
   - Thumbnail ảnh
   - Hover effects

5. **Partners Section**
   - Grid 6 cột hiển thị logo đối tác
   - 12 đối tác (VAMC, VietinBank, VPBank, VIB, SHB, HUD, VNPT, EVN, Samsung...)
   - Pagination dots

6. **Footer**
   - Thông tin công ty
   - Links về chúng tôi
   - Chính sách
   - Form đăng ký nhận tin
   - Nút scroll to top
   - Floating Zalo button

### Màu sắc chính

- Primary Red: `#B91C1C`
- Primary Dark: `#991B1B`

### Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Kết nối API Backend

Để kết nối với backend đang chạy ở port 3000:

1. Tạo file `.env`:
```
REACT_APP_API_URL=http://localhost:3000
```

2. Cài axios:
```bash
npm install axios
```

3. Tạo API service:
```typescript
// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getAuctionSessions = () => api.get('/auction-session');
export const getCategories = () => api.get('/category');
export const getAssets = () => api.get('/api/assets');
```

### Cải tiến tiếp theo

- [ ] Kết nối API thực tế
- [ ] Thêm React Router cho navigation
- [ ] Implement search functionality
- [ ] Thêm authentication flow
- [ ] Thêm real-time countdown timer
- [ ] Thêm image lazy loading
- [ ] Optimize performance
- [ ] Add loading states
- [ ] Error handling
- [ ] SEO optimization

### Troubleshooting

Nếu Tailwind CSS không hoạt động:
1. Clear cache: `rm -rf node_modules/.cache`
2. Restart dev server
3. Hard refresh browser (Ctrl+Shift+R)

Nếu có lỗi PostCSS:
- Đảm bảo đã cài đúng version: `tailwindcss@3`
- Kiểm tra `craco.config.js` đã đúng
- Kiểm tra `postcss.config.js` sử dụng `require()`

## Server đang chạy

- Backend API: http://localhost:3000
- Frontend: http://localhost:3001
