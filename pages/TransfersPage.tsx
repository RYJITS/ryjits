import React, { useState } from 'react';
import { Icons } from '../constants/icons';
import { useTranslation } from '../contexts/LocalizationContext';
import { getTranslatedPrivateTransfers, getTranslatedBusTransfers } from '../constants/translatedData';
import ImageCarousel from '../components/ImageCarousel';

const transferImages = [
    "/images/transfers/1.jpg",
    "/images/transfers/2.jpg",
    "/images/transfers/3.jpg",
];

const TransfersPage: React.FC = () => {
    const { t } = useTranslation();
    const privateTransfers = getTranslatedPrivateTransfers(t);
    const busTransfers = getTranslatedBusTransfers(t);
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);

    return (
        <div className="py-12 md:py-20 bg-stone-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900">{t('transfers.title')}</h1>
                    <p className="mt-4 text-lg text-stone-600 max-w-3xl mx-auto">
                        {t('transfers.description')}
                    </p>
                </div>

                {/* Main Info Section */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center mb-12">
                    <div className="lg:col-span-3 h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
                        <ImageCarousel images={transferImages} autoPlay />
                    </div>
                    <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg">
                        <h3 className="text-3xl font-bold text-emerald-800 mb-4">{t('transfers.info.title')}</h3>
                        <p className="text-stone-700 leading-relaxed">{t('transfers.info.description')}</p>
                    </div>
                </div>
                
                {/* Accordion for Tables */}
                <div className="bg-white rounded-xl shadow-lg">
                    <button
                        className="flex justify-between items-center cursor-pointer p-6 w-full text-left"
                        onClick={() => setIsDetailsVisible(!isDetailsVisible)}
                        aria-expanded={isDetailsVisible}
                        aria-controls="transfer-details"
                    >
                        <h2 className="text-2xl font-bold text-emerald-800">{t('transfers.viewOptions')}</h2>
                        <Icons.ChevronDown className={`w-6 h-6 text-emerald-700 transition-transform duration-300 ${isDetailsVisible ? 'rotate-180' : ''}`} />
                    </button>

                    <div
                        id="transfer-details"
                        className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isDetailsVisible ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                    >
                        <div className="overflow-hidden">
                            <div className="px-6 pb-6">
                                {/* Private Transfers Table */}
                                <div className="mb-12">
                                    <h3 className="text-xl font-bold text-emerald-800 mb-4">{t('transfers.private.title')}</h3>
                                    <div className="overflow-x-auto border border-stone-200 rounded-lg">
                                        <table className="w-full text-sm text-left text-stone-600">
                                            <thead className="text-xs text-emerald-800 uppercase bg-emerald-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">{t('transfers.table.route')}</th>
                                                    <th scope="col" className="px-6 py-3">{t('transfers.table.duration')}</th>
                                                    <th scope="col" className="px-6 py-3">{t('transfers.table.vehicle')}</th>
                                                    <th scope="col" className="px-6 py-3 text-center">{t('transfers.table.maxPersons')}</th>
                                                    <th scope="col" className="px-6 py-3 text-right">{t('transfers.table.price')}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {privateTransfers.map((transfer, index) => (
                                                    <tr key={index} className="border-b last:border-b-0 hover:bg-stone-50">
                                                        <td className="px-6 py-4 font-medium text-stone-900">{transfer.route}</td>
                                                        <td className="px-6 py-4">{transfer.duration}</td>
                                                        <td className="px-6 py-4">{transfer.vehicle}</td>
                                                        <td className="px-6 py-4 text-center">{transfer.maxPersons}</td>
                                                        <td className="px-6 py-4 text-right font-semibold text-emerald-700">{transfer.price}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Tourist Bus Table */}
                                <div>
                                    <h3 className="text-xl font-bold text-emerald-800 mb-4">{t('transfers.bus.title')}</h3>
                                    <div className="overflow-x-auto border border-stone-200 rounded-lg">
                                        <table className="w-full text-sm text-left text-stone-600">
                                            <thead className="text-xs text-emerald-800 uppercase bg-emerald-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">{t('transfers.table.route')}</th>
                                                    <th scope="col" className="px-6 py-3">{t('transfers.table.departure')}</th>
                                                    <th scope="col" className="px-6 py-3 text-right">{t('transfers.table.pricePerson')}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {busTransfers.map((transfer, index) => (
                                                    <tr key={index} className="border-b last:border-b-0 hover:bg-stone-50">
                                                        <td className="px-6 py-4 font-medium text-stone-900">{transfer.route}</td>
                                                        <td className="px-6 py-4">{transfer.departure}</td>
                                                        <td className="px-6 py-4 text-right font-semibold text-emerald-700">{transfer.price}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransfersPage;