import React from 'react';
import { Calendar } from 'lucide-react';

const NewsSection = () => {
  const news = [
    {
      date: '18/03/2026',
      title: 'TBĐG_LV Tài sản công có nguyên giá sổ sách từ 500 triệu đồng trở lên/01 đơn vị t...',
      image: 'https://via.placeholder.com/300x200?text=News1'
    },
    {
      date: '11/03/2026',
      title: 'TBĐG_LV - Lô xe đẹp, gắng tay, bơm, bộ lau nhà, giấy, ô các loại của Chi cục Điều tra...',
      image: 'https://via.placeholder.com/300x200?text=News2'
    },
    {
      date: '11/03/2026',
      title: 'TBĐG_LV - Lô xe đẹp, lâm lý, chân nến, đồng hồ treo tường, đồng hồ cây vỏ gỗ, đèn trùm...',
      image: 'https://via.placeholder.com/300x200?text=News3'
    },
    {
      date: '11/03/2026',
      title: 'TBĐG_LV - Lô 123,1 tấn phế liệu đồng của Chi cục Điều tra chống buôn lậu',
      image: 'https://via.placeholder.com/300x200?text=News4'
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-0.5 bg-primary"></div>
            <h2 className="text-3xl font-bold text-gray-800">Tin tức & thông báo mới nhất</h2>
            <div className="w-8 h-0.5 bg-primary"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="relative">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{item.date}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-gray-800 font-medium line-clamp-3 hover:text-primary transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
