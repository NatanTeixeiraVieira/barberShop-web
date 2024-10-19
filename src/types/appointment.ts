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
