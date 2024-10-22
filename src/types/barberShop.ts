import { Pagination } from '@/types/pagination';

export type BarberShop = {
  id: string;
  name: string;
  photoUrl: string;
  rating: number;
};

export type ListBarberShop = Pagination<BarberShop>;
