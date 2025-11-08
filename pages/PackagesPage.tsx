
import React from 'react';
import { Icons } from '../constants/icons';
import { useTranslation } from '../contexts/LocalizationContext';
import { getTranslatedPackagesData } from '../constants/translatedData';


const PackagesPage: React.FC = () => {
  const { t } = useTranslation();
  const packagesData = getTranslatedPackagesData(t);

  return (
    <div className="py-12 md:py-20 bg-stone-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900">{t('packages.title')}</h1>
          <p className="mt-4 text-lg text-stone-600 max-w-3xl mx-auto">
            {t('packages.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {packagesData.map((pkg, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="h-56 overflow-hidden">
                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover"/>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-emerald-800 mb-4">{pkg.name}</h3>
                <div className="mb-6 flex-grow">
                  <h4 className="font-semibold text-stone-700 mb-2">{t('packages.includedTitle')}</h4>
                  <ul className="space-y-2 text-sm text-stone-600">
                    {pkg.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Icons.Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"/>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto pt-4 border-t border-stone-200">
                  <h4 className="font-semibold text-stone-700 mb-2">{t('packages.priceTitle')}</h4>
                  <div className="space-y-1">
                    {pkg.prices.map((price, i) => (
                       <p key={i} className="text-sm font-medium text-emerald-700 bg-emerald-50 p-2 rounded-md">{price}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;