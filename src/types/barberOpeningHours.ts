type OpeningHourOutput = {
  start: string;
  end: string;
  id: string;
};

export type WeekdayOutput = {
  name: string;
  openingHours: OpeningHourOutput[];
};

export type BarberOpeningHours = {
  weekdays: WeekdayOutput[];
};

export type CreateOpeningHoursDto = {
  weekday: string;
  start: string;
  end: string;
  barberShopId: string;
};

export type CreateOpeningHoursDtoArray = {
  weekdays: CreateOpeningHoursDto[];
};
