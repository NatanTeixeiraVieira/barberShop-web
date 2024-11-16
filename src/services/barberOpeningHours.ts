import {
  BarberOpeningHours,
  CreateOpeningHoursDtoArray,
} from '@/types/barberOpeningHours';
import { api } from './api';

export const getBarberOpeningHours = async (barberId: string) => {
  const barberOpeningHours = await api.get<BarberOpeningHours>(
    `/barber-opening-hours/v1/barber-shop-id/${barberId}`,
  );

  return barberOpeningHours;
};

export const createBarberOpeningHours = async (
  dto: CreateOpeningHoursDtoArray,
) => {
  const createdBarberOpeningHours = await api.post<BarberOpeningHours>(
    '/barber-opening-hours/v1',
    dto,
  );

  return createdBarberOpeningHours;
};
