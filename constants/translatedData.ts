import { roomsDataStructure, jungleTreksStructure, otherExcursionsStructure, privateTransfersStructure, busTransfersStructure, packagesDataStructure } from './data';
import { Room, Trek, OtherExcursion, PrivateTransfer, BusTransfer, Package } from '../types';

type TFunction = (key: string, replacements?: { [key: string]: string | number }) => string;

export const getTranslatedRoomsData = (t: TFunction): Room[] => {
  return roomsDataStructure.map(room => ({
    name: t(room.nameKey),
    images: room.images.map(img => `/images/rooms/${room.imageFolder}/${img}`),
    features: room.features.map(feature => ({
      icon: feature.icon,
      text: t(feature.textKey)
    })),
    details: room.details.map(category => ({
      category: t(category.categoryKey),
      items: category.items.map(item => ({
        icon: item.icon,
        text: t(item.textKey)
      }))
    }))
  }));
};

export const getTranslatedJungleTreks = (t: TFunction): Trek[] => {
  return jungleTreksStructure.map(trek => ({
    duration: t(trek.durationKey),
    meals: t(trek.mealsKey),
    price: trek.price
  }));
};

export const getTranslatedOtherExcursions = (t: TFunction): OtherExcursion[] => {
    return otherExcursionsStructure.map(excursion => ({
        name: t(excursion.nameKey),
        image: `/images/other-excursions/${excursion.folder}/${excursion.image}`,
        description: t(excursion.descriptionKey),
        details: excursion.detailsKeys.map(key => t(key))
    }));
};

export const getTranslatedPrivateTransfers = (t: TFunction): PrivateTransfer[] => {
    return privateTransfersStructure.map(transfer => ({
        route: t(transfer.routeKey),
        duration: transfer.duration,
        vehicle: t(transfer.vehicleKey),
        maxPersons: transfer.maxPersons,
        price: transfer.price
    }));
};

export const getTranslatedBusTransfers = (t: TFunction): BusTransfer[] => {
    return busTransfersStructure.map(transfer => ({
        route: t(transfer.routeKey),
        departure: transfer.departure,
        price: transfer.price
    }));
};

export const getTranslatedPackagesData = (t: TFunction): Package[] => {
    return packagesDataStructure.map(pkg => ({
        name: t(pkg.nameKey),
        image: `/images/packages/${pkg.image}`,
        inclusions: pkg.inclusionKeys.map(key => t(key)),
        prices: pkg.priceKeys.map(key => t(key))
    }));
};