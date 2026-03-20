import React from 'react';
import { Search, Clock } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center">
              <div className="text-white font-bold text-xs text-center leading-tight">
                ĐẤU GIÁ<br/>LẠC VIỆT
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-red-700 py-2">
                <span>Tài sản đấu giá</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-red-700 py-2">
                <span>Phiên đấu giá</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-red-700 py-2">
                <span>Tin tức</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <button className="text-gray-700 hover:text-red-700 py-2">Giới thiệu</button>
            <button className="text-gray-700 hover:text-red-700 py-2">Liên hệ</button>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-5 h-3 bg-red-500 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs">🇻🇳</span>
              </div>
              <span className="text-gray-600">VI</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <div className="flex flex-col">
                <span className="font-medium">13:36:37</span>
                <span className="text-xs">Thứ Sáu, 20/03/2026</span>
              </div>
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            <button className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800 transition-colors">
              Đăng Nhập
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
