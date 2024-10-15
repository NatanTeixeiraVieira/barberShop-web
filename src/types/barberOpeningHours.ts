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
