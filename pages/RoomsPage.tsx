import React, { useState } from 'react';
import { Room } from '../types';
import { Icons } from '../constants/icons';
import ImageCarousel from '../components/ImageCarousel';
import Modal from '../components/Modal';
import { useTranslation } from '../contexts/LocalizationContext';
import { getTranslatedRoomsData } from '../constants/translatedData';

const RoomCard: React.FC<{ room: Room; onViewDetails: () => void; }> = ({ room, onViewDetails }) => {

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-2xl flex flex-col">
            <div className="relative w-full h-48">
                <ImageCarousel images={room.images} />
            </div>

            <div className="grid grid-cols-4 gap-2 p-4 border-b border-stone-200 text-center">
                {room.features.map((feature, index) => {
                    const Icon = Icons[feature.icon];
                    return (
                        <div key={index} className="flex flex-col items-center justify-start">
                            <Icon className="w-6 h-6 text-emerald-600 mb-1"/>
                            <span className="text-xs text-stone-600 leading-tight">{feature.text}</span>
                        </div>
                    );
                })}
            </div>
            
            <div className="p-6">
                <div 
                    className="flex justify-between items-center cursor-pointer" 
                    onClick={onViewDetails}
                    role="button"
                    aria-haspopup="dialog"
                    aria-controls={`details-modal-${room.name.replace(/\s+/g, '-')}`}
                >
                    <h3 className="text-2xl font-bold text-emerald-800">{room.name}</h3>
                    <div className="p-1 rounded-full transition-colors text-emerald-700 hover:bg-stone-100">
                        <Icons.Plus className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const RoomsPage: React.FC = () => {
  const { t } = useTranslation();
  const roomsData = getTranslatedRoomsData(t);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  return (
    <div className="py-12 md:py-20 bg-stone-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900">{t('roomsPage.title')}</h1>
          <p className="mt-4 text-lg text-stone-600 max-w-3xl mx-auto">
            {t('roomsPage.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {roomsData.map((room) => (
            <RoomCard key={room.name} room={room} onViewDetails={() => setSelectedRoom(room)} />
          ))}
        </div>
      </div>
      <Modal
        isOpen={!!selectedRoom}
        onClose={() => setSelectedRoom(null)}
        title={selectedRoom?.name || ''}
      >
        {selectedRoom && (
            <div id={`details-modal-${selectedRoom.name.replace(/\s+/g, '-')}`}>
                {selectedRoom.details.map((category, catIndex) => (
                <div key={catIndex} className="mb-4">
                    <h4 className="font-semibold text-stone-700 mb-2">{category.category}</h4>
                    <ul className="space-y-1 text-sm text-stone-600">
                        {category.items.map((item, itemIndex) => {
                            const Icon = Icons[item.icon];
                            return (
                                <li key={itemIndex} className="flex items-center space-x-3">
                                    <Icon className="w-4 h-4 text-emerald-500" />
                                    <span>{item.text}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                ))}
            </div>
        )}
      </Modal>
    </div>
  );
};

export default RoomsPage;