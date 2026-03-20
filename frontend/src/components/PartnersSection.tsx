import React from 'react';

const PartnersSection = () => {
  const partners = [
    { name: 'VAMC', logo: 'https://via.placeholder.com/120x60?text=VAMC' },
    { name: 'VietinBank', logo: 'https://via.placeholder.com/120x60?text=VietinBank' },
    { name: 'VPBank', logo: 'https://via.placeholder.com/120x60?text=VPBank' },
    { name: 'VIB', logo: 'https://via.placeholder.com/120x60?text=VIB' },
    { name: 'SHB', logo: 'https://via.placeholder.com/120x60?text=SHB' },
    { name: 'HUD', logo: 'https://via.placeholder.com/120x60?text=HUD' },
    { name: 'VNPT', logo: 'https://via.placeholder.com/120x60?text=VNPT' },
    { name: 'EVN', logo: 'https://via.placeholder.com/120x60?text=EVN' },
    { name: 'Partner 1', logo: 'https://via.placeholder.com/120x60?text=Partner1' },
    { name: 'Partner 2', logo: 'https://via.placeholder.com/120x60?text=Partner2' },
    { name: 'Partner 3', logo: 'https://via.placeholder.com/120x60?text=Partner3' },
    { name: 'Samsung', logo: 'https://via.placeholder.com/120x60?text=Samsung' },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-0.5 bg-primary"></div>
            <h2 className="text-3xl font-bold text-gray-800">Khách hàng & đối tác tiêu biểu</h2>
            <div className="w-8 h-0.5 bg-primary"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {partners.map((partner, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-center hover:shadow-md transition-shadow">
              <img src={partner.logo} alt={partner.name} className="max-w-full h-12 object-contain" />
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-8 space-x-2">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
