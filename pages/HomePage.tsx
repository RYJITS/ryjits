import React from 'react';
import ImageCarousel from '../components/ImageCarousel';
import { useTranslation } from '../contexts/LocalizationContext';

const homeImages = [
    "/images/home/1.jpg",
    "/images/home/2.jpg",
    "/images/home/3.jpg",
    "/images/home/4.jpg",
];

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="relative h-[calc(100vh-72px)] w-full">
      <ImageCarousel images={homeImages} autoPlay={true} interval={6000} />
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white p-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.7)'}}>{t('homePage.title')}</h1>
        <p className="text-lg md:text-2xl max-w-3xl" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.7)'}}>{t('homePage.subtitle')}</p>
      </div>
    </div>
  );
};

export default HomePage;