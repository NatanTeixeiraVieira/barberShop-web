import {
  CreateAppointment,
  CreateAppointmentDto,
  GetBarberShopAppointmentsDto,
  GetClientAppointmentsDto,
  ListBarberShopAppointments,
  ListClientAppointments,
} from '@/types/appointment';
import { api } from './api';

export const createAppointment = async (dto: CreateAppointmentDto) => {
  const createAppointment = await api.post<CreateAppointment>(
    `/appointment/v1`,
    dto,
  );

  return createAppointment;
};

export const getClientAppointment = async (dto: GetClientAppointmentsDto) => {
  const pagination = dto ?? { limit: 20, page: 1 };
  const searchParams = new URLSearchParams();
  if (pagination.page) {
    searchParams.append('page', pagination.page.toString());
  }

  if (pagination.limit) {
    searchParams.append('limit', pagination.limit.toString());
  }

  const barberShop = await api.get<ListClientAppointments>(
    `/appointment/v1/client-appointments`,
  );

  return barberShop;
};

export const getBarberShopAppointment = async (
  dto: GetBarberShopAppointmentsDto,
) => {
  const pagination = dto ?? { limit: 20, page: 1 };
  const searchParams = new URLSearchParams();
  if (pagination.page) {
    searchParams.append('page', pagination.page.toString());
  }

  if (pagination.limit) {
    searchParams.append('limit', pagination.limit.toString());
  }

  const barberShop = await api.get<ListBarberShopAppointments>(
    `/appointment/v1/barber-shop-appointments/barber-shop-id/${dto.barberShopId}`,
  );

  return barberShop;
};
