import { CreateAppointment, CreateAppointmentDto } from '@/types/appointment';
import { api } from './api';

export const createAppointment = async (dto: CreateAppointmentDto) => {
  const createAppointment = await api.post<CreateAppointment>(
    `/appointment/v1`,
    dto,
  );

  return createAppointment;
};
