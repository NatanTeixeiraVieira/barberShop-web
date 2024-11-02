import {
  BarberShopService,
  BarberShopServicesList,
  CreateBarberShopService,
  UpdateBarberShopService,
  UpsertBarberShopService,
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
  const body: UpsertBarberShopService = {
    barberShopId: dto.barberShopId,
    duration: dto.duration,
    name: dto.name,
    price: dto.price,
  };

  const updatedBarberShopService = await api.put<BarberShopService>(
    `/barber-service/v1/${dto.id}`,
    body,
  );

  return updatedBarberShopService;
};

export const deleteBarberShopService = async (barberServiceId: string) => {
  await api.delete(`/barber-service/v1/${barberServiceId}`);
};
