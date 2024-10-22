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

export type GetBarberShopAppointmentsDto = PaginationDto & {
  barberShopId: string;
};

export type Appointment = {
  id: string;
  date: Date;
  service: {
    id: string;
    name: string;
    price: number;
  };
};

export type ClientAppointment = Appointment & {
  barber: {
    id: string;
    photoUrl: string;
    name: string;
  };
};

export type BarberShopAppointment = Appointment & {
  client: {
    id: string;
    photoUrl: string;
    name: string;
  };
};

export type ListClientAppointments = Pagination<ClientAppointment>;

export type ListBarberShopAppointments = Pagination<BarberShopAppointment>;
