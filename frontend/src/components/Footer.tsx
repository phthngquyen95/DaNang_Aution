import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Công ty đấu giá hợp danh Lạc Việt</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Mã số thuế: 0108355420</p>
              <p>Chủ tịch Hội đồng Quản trị kiêm Giám đốc Điều hành: Bà Đỗ Thị Hồng Hạnh</p>
              <p>Tổng giám đốc Công ty Đấu giá Hợp danh Xuyên Sơn</p>
              <p>Số giấy đăng ký hoạt động: 01/TP ĐKHĐ do Sở tư pháp Thành phố Hà Nội Cấp ngày</p>
            </div>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-lg font-bold mb-4">Về chúng tôi</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">Giới thiệu</a></li>
              <li><a href="#" className="hover:text-white">Quy chế hoạt động</a></li>
              <li><a href="#" className="hover:text-white">Cơ chế giải quyết tranh chấp</a></li>
              <li><a href="#" className="hover:text-white">Hướng dẫn sử dụng</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-bold mb-4">Chính sách</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="hover:text-white">Cho thuê tổ chức đấu giá trực tuyến</a></li>
              <li><a href="#" className="hover:text-white">Văn bản pháp quy</a></li>
              <li><a href="#" className="hover:text-white">Chính sách bảo mật thông tin</a></li>
              <li><a href="#" className="hover:text-white">Điều khoản sử dụng</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Tham gia nhận tin</h3>
            <p className="text-sm text-gray-300 mb-4">Đăng ký nhận tin mới qua email</p>
            
            <div className="flex mb-4">
              <input 
                type="email" 
                placeholder="Nhập Email" 
                className="flex-1 px-4 py-2 rounded-l bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary"
              />
              <button className="bg-primary px-6 py-2 rounded-r hover:bg-primary-dark">
                Đăng Ký
              </button>
            </div>

            <div className="mb-4">
              <img src="https://via.placeholder.com/150x50?text=Registered" alt="Registered" className="h-12" />
            </div>

            {/* Scroll to top */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-primary p-3 rounded-full hover:bg-primary-dark transition-colors"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-400">
          <p>© 2026 Công ty đấu giá hợp danh Lạc Việt. All rights reserved.</p>
        </div>
      </div>

      {/* Floating buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col space-y-3">
        <a href="https://zalo.me" target="_blank" rel="noopener noreferrer" 
           className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
          <span className="text-sm font-bold">Zalo</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
