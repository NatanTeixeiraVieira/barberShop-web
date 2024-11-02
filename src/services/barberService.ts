import {
  BarberShopService,
  BarberShopServicesList,
  CreateBarberShopService,
  UpdateBarberShopService,
} from '@/types/barberService';
import { api } from './api';

export const getBarberShopServicesByBarberShopId = async (
  barberShopId: string,
) => {
  const barberShopServices = await api.get<BarberShopServicesList>(
    `barber-service/v1/barber-shop/${barberShopId}`,
  );

  return barberShopServices;
};

export const createBarberShopService = async (dto: CreateBarberShopService) => {
  const createdBarberShopService = await api.post<BarberShopService>(
    '/barber-service/v1',
    dto,
  );

  return createdBarberShopService;
};

export const updateBarberShopService = async (dto: UpdateBarberShopService) => {
  const updatedBarberShopService = await api.put<BarberShopService>(
    '/barber-service/v1',
    dto,
  );

  return updatedBarberShopService;
};
