import React from 'react';
import { Calendar, Share2 } from 'lucide-react';

interface AuctionCardProps {
  title: string;
  startingPrice: string;
  endTime: string;
  images?: string[];
  status?: string;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ 
  title, 
  startingPrice, 
  endTime,
  images = [],
  status
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border">
      {/* Time badge */}
      <div className="relative">
        <div className="absolute top-3 left-3 bg-white px-3 py-2 rounded shadow-sm z-10 border">
          <div className="text-xs text-gray-600">Thời gian kết thúc</div>
          <div className="text-sm font-semibold text-gray-800">{endTime}</div>
        </div>

        {/* Image area */}
        <div className="aspect-square bg-gray-100">
          {images.length > 0 ? (
            images.length === 1 ? (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-4xl">🏠</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-1 h-full p-2">
                {Array.from({length: 4}).map((_, idx) => (
                  <div key={idx} className="bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-2xl">🚗</span>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <div className="text-gray-400 text-6xl">📷</div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-gray-800 mb-3 line-clamp-3 min-h-[4.5rem] leading-tight">
          {title}
        </h3>

        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-gray-500 mb-1">Giá khởi điểm</div>
            <div className="text-red-700 font-bold text-lg">{startingPrice}</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="flex-1 bg-red-700 text-white py-2 px-4 rounded hover:bg-red-800 transition-colors font-medium">
            Chi Tiết
          </button>
          <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
