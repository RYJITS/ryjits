
import React from 'react';
import { useTranslation } from '../contexts/LocalizationContext';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-stone-800 text-stone-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-4">{t('footer.contact')}</h3>
            <p className="text-sm">{t('footer.address')}</p>
            <p className="text-sm">+62 123 4567 890</p>
            <p className="text-sm">contact@gardeninn.com</p>
          </div>

          {/* Google Reviews */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-4">{t('footer.reviewsTitle')}</h3>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-white text-stone-800 py-2 px-4 rounded-full text-sm font-semibold hover:bg-stone-200 transition-colors"
            >
              {t('footer.reviewsButton')}
            </a>
          </div>

          {/* Instagram */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold text-white mb-4">{t('footer.socialTitle')}</h3>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-2 px-4 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              {t('footer.socialButton')}
            </a>
          </div>
        </div>
      </div>
      <div className="bg-stone-900 py-4">
        <div className="container mx-auto px-4 text-center text-xs text-stone-500">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;