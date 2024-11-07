import { createBarberShopSchema } from "@/validations/schemas/createBarberShopHours";
import { z } from "zod";

export type OpeningHourOutput = {
  start: string;
  end: string;
  id: string;
};

export type CreateOpeningHoursDto = {
  weekday: string;
  start: string;
  end: string;
  barberShopId: string;
}

export interface CreateOpeningHoursDtoArray {
  weekdays: {
    day: string;
    start: string;
    end: string;
  }[];
}

export type WeekdayOutput = {
  name: string;
  openingHours: OpeningHourOutput[];
};

export type BarberOpeningHours = {
  weekdays: WeekdayOutput[];
};

export type BarberShopHoursData = z.infer<typeof createBarberShopSchema>;
