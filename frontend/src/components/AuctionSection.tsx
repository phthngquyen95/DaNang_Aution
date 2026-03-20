import React from 'react';
import AuctionCard from './AuctionCard';

const AuctionSection = () => {
  const completedAuctions = [
    {
      title: 'TB 527 Quyền sử dụng đất và tài sản gắn liền với đất tại xã Cát Khánh, huyện Phù Cát, tỉnh Bình Định (nay là Đất Gi...)',
      startingPrice: '780.000.000 VNĐ',
      endTime: '20/03/2026 10:30:00',
      images: ['single']
    },
    {
      title: '01 Xe ô tô con biển số 51F-759.41, Nhãn hiệu: TOYOTA FORTUNER - Thi hành án dân sự Thành phố Hồ Chí Minh',
      startingPrice: '403.433.000 VNĐ',
      endTime: '19/03/2026 13:20:00',
      images: ['multiple']
    },
    {
      title: '01 xe ô tô con nhãn hiệu TOYOTA FORTUNER 2.0A-000.07; Năm sản xuất: 2010.',
      startingPrice: '220.000.000 VNĐ',
      endTime: '19/03/2026 14:30:00',
      images: []
    },
    {
      title: '01 xe tải có cẩu cầu, hiệu CAMC, biển số 51D-108.18 - Thi hành án dân sự Thành phố Hồ Chí Minh',
      startingPrice: '91.833.000 VNĐ',
      endTime: '19/03/2026 14:20:00',
      images: ['multiple']
    }
  ];

  const upcomingAuctions = [
    {
      title: 'Mặt bằng căn tin - Trường Trung học cơ sở Nguyễn Tri Phương',
      startingPrice: '49.986.667 VNĐ',
      endTime: '20/03/2026 14:00:00',
      images: ['single']
    },
    {
      title: 'Quyền sử dụng đất thuộc thửa đất số 1, tờ bản đồ số 64, ấp 11, xã Xuân Tây, huyện Cẩm Mỹ, tỉnh Đồng Nai (nay là xã Xuân Đông...)',
      startingPrice: '6.075.000.000 VNĐ',
      endTime: '20/03/2026 14:00:00',
      images: ['single']
    },
    {
      title: 'Mặt bằng nhà xe - Trường Trung học cơ sở Nguyễn Tri Phương',
      startingPrice: '28.228.667 VNĐ',
      endTime: '20/03/2026 15:00:00',
      images: ['single']
    },
    {
      title: 'Lô 123,1 tấn phế liệu đồng của Chi cục Điều tra chống buôn lậu',
      startingPrice: '32.744.600.000 VNĐ',
      endTime: '23/03/2026 09:00:00',
      images: ['single']
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Completed Auctions */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-0.5 bg-red-700"></div>
              <h2 className="text-3xl font-bold text-gray-800">Tài sản đã đấu giá</h2>
              <div className="w-8 h-0.5 bg-red-700"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {completedAuctions.map((auction, index) => (
              <AuctionCard key={index} {...auction} />
            ))}
          </div>

          <div className="text-center">
            <button className="border-2 border-red-700 text-red-700 px-8 py-3 rounded-lg hover:bg-red-700 hover:text-white transition-colors font-medium">
              Xem Tất Cả
            </button>
          </div>
        </div>

        {/* Upcoming Auctions */}
        <div>
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-0.5 bg-red-700"></div>
              <h2 className="text-3xl font-bold text-gray-800">Tài sản sắp được đấu giá</h2>
              <div className="w-8 h-0.5 bg-red-700"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {upcomingAuctions.map((auction, index) => (
              <AuctionCard key={index} {...auction} />
            ))}
          </div>

          <div className="text-center">
            <button className="border-2 border-red-700 text-red-700 px-8 py-3 rounded-lg hover:bg-red-700 hover:text-white transition-colors font-medium">
              Xem Tất Cả
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionSection;