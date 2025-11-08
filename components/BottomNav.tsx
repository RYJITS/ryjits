import React from 'react';
import { Page } from '../types';
import { Icons } from '../constants/icons';
import { useTranslation } from '../contexts/LocalizationContext';

interface NavItemProps {
    page: Page;
    label: string;
    icon: keyof typeof Icons;
    isActive: boolean;
    onNavClick: (page: Page) => void;
}

// Fix: Corrected the type definition for navItemData to be an array of objects with the correct properties.
interface NavItemData {
    page: Page;
    labelKey: string;
    icon: keyof typeof Icons;
}

const navItemData: NavItemData[] = [
  { page: Page.Home, labelKey: 'bottomNav.home', icon: 'Home' },
  { page: Page.Rooms, labelKey: 'bottomNav.rooms', icon: 'Bed' },
  { page: Page.Excursions, labelKey: 'bottomNav.excursions', icon: 'Footprints' },
  { page: Page.Transfers, labelKey: 'bottomNav.transfers', icon: 'Car' },
  { page: Page.Packages, labelKey: 'bottomNav.packages', icon: 'Gift' },
  { page: Page.Contact, labelKey: 'bottomNav.contact', icon: 'Mail' },
];

const NavItem: React.FC<NavItemProps> = ({ page, label, icon, isActive, onNavClick }) => {
  const Icon = Icons[icon];
  const activeClasses = 'text-emerald-600';
  const inactiveClasses = 'text-stone-500 group-hover:text-emerald-600';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavClick(page);
  };

  return (
    <a 
        href={`#${page.toLowerCase()}`} 
        onClick={handleClick}
        className="flex flex-col items-center justify-center space-y-1 group transition-colors duration-200"
        aria-current={isActive ? 'page' : undefined}
    >
      <Icon className={`w-6 h-6 transition-colors duration-200 ${isActive ? activeClasses : inactiveClasses}`} />
      <span className={`text-xs font-medium transition-colors duration-200 ${isActive ? activeClasses : inactiveClasses}`}>
        {label}
      </span>
    </a>
  );
};

interface BottomNavProps {
    activePage: Page;
    onNavClick: (page: Page) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activePage, onNavClick }) => {
  const { t } = useTranslation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-sm shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-40 md:hidden">
      <div className="flex justify-around items-center h-full max-w-xl mx-auto px-2">
        {navItemData.map(item => (
          <NavItem key={item.page} {...item} label={t(item.labelKey)} isActive={activePage === item.page} onNavClick={onNavClick} />
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
