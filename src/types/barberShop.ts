import { Pagination } from '@/types/pagination';
import { barberShopProfileSchema } from '@/validations/schemas/barberShopProfile';
import { formBarberShopSchema } from '@/validations/schemas/form-barber-shop';
import { z } from 'zod';

export type BarberShop = {
  id: string;
  name: string;
  photoUrl: string;
  rating: number;
};

export type CreateBarberShopFormData = z.infer<typeof formBarberShopSchema>

export type CreateBarberShopDto = {
  name: string;
  cnpj: string;
  state: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  phone: string;
};

export type UpdateBarberShopDto = CreateBarberShopDto & { photoUrl: string };

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
