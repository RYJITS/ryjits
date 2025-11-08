import React from 'react';
import { Page } from '../types';
import { logEvent } from '../services/chichiLog';
import { useTranslation } from '../contexts/LocalizationContext';

interface HeaderProps {
  activePage: Page;
  onNavClick: (page: Page) => void;
}

const NavLink: React.FC<{
  page: Page;
  activePage: Page;
  onNavClick: (page: Page) => void;
  children: React.ReactNode;
}> = ({ page, activePage, onNavClick, children }) => {
  const isActive = activePage === page;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavClick(page);
  };

  return (
    <a
      href={`#${page.toLowerCase()}`}
      onClick={handleClick}
      className={`py-2 px-3 text-sm font-medium transition-colors duration-300 ${
        isActive ? 'text-emerald-600' : 'text-stone-600 hover:text-emerald-600'
      }`}
    >
      {children}
    </a>
  );
};

const Header: React.FC<HeaderProps> = ({ activePage, onNavClick }) => {
  const { t, language, setLanguage } = useTranslation();

  const handleLangSwitch = (lang: string) => {
    logEvent('lang-switch', { lang });
    setLanguage(lang);
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm z-20 sticky top-0">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <a href="#home" onClick={(e) => { e.preventDefault(); onNavClick(Page.Home); }} className="text-2xl font-bold text-emerald-800">
            Garden Inn
          </a>

          <nav className="hidden md:flex items-center space-x-2 bg-stone-100 rounded-full px-2">
            <NavLink page={Page.Rooms} activePage={activePage} onNavClick={onNavClick}>{t('nav.rooms')}</NavLink>
            <NavLink page={Page.Excursions} activePage={activePage} onNavClick={onNavClick}>{t('nav.excursions')}</NavLink>
            <NavLink page={Page.Transfers} activePage={activePage} onNavClick={onNavClick}>{t('nav.transfers')}</NavLink>
            <NavLink page={Page.Packages} activePage={activePage} onNavClick={onNavClick}>{t('nav.packages')}</NavLink>
            <NavLink page={Page.Contact} activePage={activePage} onNavClick={onNavClick}>{t('nav.contact')}</NavLink>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
               <button onClick={() => handleLangSwitch('en')} className={`w-6 h-4 bg-cover bg-center rounded-sm transition-opacity ${language === 'en' ? 'ring-2 ring-emerald-600' : 'opacity-60 hover:opacity-100'}`} style={{backgroundImage: `url('https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png')`}} title="English"></button>
               <button onClick={() => handleLangSwitch('fr')} className={`w-6 h-4 bg-cover bg-center rounded-sm transition-opacity ${language === 'fr' ? 'ring-2 ring-emerald-600' : 'opacity-60 hover:opacity-100'}`} style={{backgroundImage: `url('https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.svg.png')`}} title="French"></button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;