import { Pagination, PaginationDto } from './pagination';

export type CreateAppointmentDto = {
  barberServiceId: string;
  barberShopId: string;
  date: Date;
};

export type CreateAppointment = {
  id: string;
  barberServiceId: string;
  barberShopId: string;
  clientId: string;
  date: Date;
};

export type GetClientAppointmentsDto = PaginationDto;

export type ClientAppointment = {
  id: string;
  date: Date;
  service: {
    id: string;
    name: string;
    price: number;
  };
  barber: {
    id: string;
    photoUrl: string;
    name: string;
  };
};

export type ListClientAppointments = Pagination<ClientAppointment>;
