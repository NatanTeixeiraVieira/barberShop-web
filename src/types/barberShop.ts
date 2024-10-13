import { Pagination } from '@/services/pagination';

export type BarberShop = {
  id: string;
  name: string;
  photoUrl: string;
  rating: number;
};

export type ListBarberShop = Pagination<BarberShop>;
