import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-20 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-700 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-500 rounded-full opacity-5 blur-2xl"></div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <p className="text-red-700 font-medium text-lg">Chào mừng bạn đến với Lạc Việt Auction</p>
            
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
              Nền tảng đấu giá trực tuyến hàng đầu Việt Nam
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed">
              Tự hào là một trong những nhà đấu giá lớn nhất tại Việt Nam, Lạc Việt luôn là đơn vị tiên phong ứng dụng công nghệ thông tin vào hoạt động đấu giá. Ngay từ 17/07/2021, Lạc Việt vinh dự trở thành công ty đấu giá trực tuyến chính thống đầu tiên tại Việt Nam, mở ra chuỗi mới cho hoạt động đấu giá trên cả nước nhà.
            </p>

            <button className="bg-red-700 text-white px-8 py-3 rounded-lg hover:bg-red-800 transition-colors font-medium">
              KHÁM PHÁ
            </button>
          </div>

          {/* Right content - App showcase */}
          <div className="relative">
            <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-8 text-white relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full grid grid-cols-8 gap-4">
                  {Array.from({length: 64}).map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
                  ))}
                </div>
              </div>

              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                  ĐẤU GIÁ LẠC VIỆT<br/>
                  TIÊN PHONG DẪN ĐẦU<br/>
                  CÔNG NGHỆ
                </h2>

                <p className="mb-6 text-teal-100">
                  NHÀ ĐẤU GIÁ ỨNG DỤNG CÔNG NGHỆ <span className="font-bold text-white">BLOCKCHAIN</span><br/>
                  ĐẦU TIÊN TẠI <span className="font-bold text-white">VIỆT NAM</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <div className="bg-black bg-opacity-20 px-4 py-2 rounded-lg flex items-center space-x-2">
                    <span className="text-sm">📱 Google Play</span>
                  </div>
                  <div className="bg-black bg-opacity-20 px-4 py-2 rounded-lg flex items-center space-x-2">
                    <span className="text-sm">🍎 App Store</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <div className="text-red-700 font-bold text-xs text-center leading-tight">
                      ĐẤU GIÁ<br/>LẠC VIỆT
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone mockup */}
              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
                <div className="w-48 h-96 bg-white rounded-3xl shadow-2xl p-2">
                  <div className="w-full h-full bg-gray-100 rounded-2xl overflow-hidden">
                    <div className="bg-white p-3">
                      <div className="text-xs text-gray-500 mb-2">Tài sản đấu giá</div>
                      <div className="bg-gray-200 rounded-lg p-3">
                        <div className="w-full h-20 bg-gray-300 rounded mb-2"></div>
                        <div className="text-xs">
                          <p className="font-semibold text-gray-800 mb-1">01 Xe ô tô con nhãn hiệu...</p>
                          <p className="text-red-700 font-bold">220.000.000 VNĐ</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
