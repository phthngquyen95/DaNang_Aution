# Đấu Giá Lạc Việt - Frontend

Landing page cho hệ thống đấu giá trực tuyến Lạc Việt.

## Công nghệ sử dụng

- React 18 với TypeScript
- Tailwind CSS
- Lucide React (icons)
- React Router (sẵn sàng tích hợp)

## Cài đặt

```bash
npm install
```

## Chạy development

```bash
npm start
```

Mở [http://localhost:3000](http://localhost:3000) để xem.

## Build production

```bash
npm run build
```

## Cấu trúc thư mục

```
src/
├── components/
│   ├── Header.tsx          # Header với navigation
│   ├── HeroSection.tsx     # Hero section với app showcase
│   ├── AuctionCard.tsx     # Card hiển thị tài sản đấu giá
│   ├── AuctionSection.tsx  # Section tài sản đã/sắp đấu giá
│   ├── NewsSection.tsx     # Section tin tức
│   ├── PartnersSection.tsx # Section đối tác
│   └── Footer.tsx          # Footer
├── lib/
│   └── utils.ts            # Utility functions
├── App.tsx                 # Main app component
└── index.css               # Tailwind CSS imports
```

## Tính năng

- ✅ Responsive design
- ✅ Hero section với app showcase
- ✅ Danh sách tài sản đã đấu giá
- ✅ Danh sách tài sản sắp đấu giá
- ✅ Tin tức & thông báo
- ✅ Đối tác tiêu biểu
- ✅ Footer với thông tin công ty
- ✅ Floating Zalo button
- ✅ Scroll to top button

## Tích hợp API

Để kết nối với backend API, cập nhật các component để fetch data từ:

- `GET /category` - Danh mục
- `GET /auction-session` - Phiên đấu giá
- `GET /api/assets` - Tài sản đấu giá

## Customization

Màu sắc chính có thể thay đổi trong `tailwind.config.js`:

```js
colors: {
  primary: {
    DEFAULT: '#B91C1C',
    dark: '#991B1B',
  },
}
```
