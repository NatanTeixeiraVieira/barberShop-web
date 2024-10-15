type OpeningHourOutput = {
  start: string;
  end: string;
};

type WeekdayOutput = {
  name: string;
  openingHours: OpeningHourOutput[];
};

export type BarberOpeningHours = {
  weekdays: WeekdayOutput[];
};
