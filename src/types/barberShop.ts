import { Pagination } from '@/types/pagination';
import { barberShopProfileSchema } from '@/validations/schemas/barberShopProfile';
import { z } from 'zod';

export type BarberShop = {
  id: string;
  name: string;
  photoUrl: string;
  rating: number;
};

export type ListBarberShop = Pagination<BarberShop>;

export type BarberShopProfile = {
  id: string;
  cnpj: string;
  cep: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  phone: string;
  photoUrl: string;
  rating: number;
  name: string;
  street: string;
};

export type BarberShopProfileFormData = z.infer<typeof barberShopProfileSchema>;

export type UpdateBarberShopProfileDto = {
  barberShopId: string;
  name: string;
  cnpj: string;
  cep: string;
  number: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  phone: string;
  fileList?: FileList;
};
