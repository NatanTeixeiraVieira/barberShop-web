import { ListBarberShop } from '@/types/barberShop';
import { api } from './api';
import { PaginationDto } from './pagination';

export const getBarberShopList = async (paginationDto?: PaginationDto) => {
  const pagination = paginationDto ?? { limit: 20, page: 1 };
  const searchParams = new URLSearchParams();
  if (pagination.page) {
    searchParams.append('page', pagination.page.toString());
  }

  if (pagination.limit) {
    searchParams.append('limit', pagination.limit.toString());
  }

  const barberShop = await api.get<ListBarberShop>(
    `/barber-shop/v1?${searchParams.toString()}`,
  );

  return barberShop;
};
