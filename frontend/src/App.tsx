import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AuctionSection from './components/AuctionSection';
import NewsSection from './components/NewsSection';
import PartnersSection from './components/PartnersSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <AuctionSection />
        <NewsSection />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
