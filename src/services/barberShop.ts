import {
  BarberShopProfile,
  ListBarberShop,
  UpdateBarberShopProfileDto,
} from '@/types/barberShop';
import { api } from './api';
import { PaginationDto } from '../types/pagination';

export const getBarberShopList = async (
  paginationDto?: PaginationDto,
  search?: string,
) => {
  const pagination = paginationDto ?? { limit: 20, page: 1 };
  const searchParams = new URLSearchParams();
  if (pagination.page) {
    searchParams.append('page', pagination.page.toString());
  }

  if (pagination.limit) {
    searchParams.append('limit', pagination.limit.toString());
  }

  if (search) {
    searchParams.append('search', search);
  }

  const barberShop = await api.get<ListBarberShop>(
    `/barber-shop/v1?${searchParams.toString()}`,
  );

  return barberShop;
};

export const getBarberShopProfile = async ({ id }: Record<'id', string>) => {
  const barberShop = await api.get<BarberShopProfile>(
    `/barber-shop/v1/barber-shop-id/${id}`,
  );

  return barberShop;
};

export const updateBarberShopProfile = async ({
  barberShopId,
  cep,
  city,
  cnpj,
  name,
  neighborhood,
  number,
  street,
  phone,
  state,
  fileList,
}: UpdateBarberShopProfileDto) => {
  const body = new FormData();

  const dto: Omit<UpdateBarberShopProfileDto, 'barberShopId' | 'fileList'> = {
    cep,
    city,
    cnpj,
    name,
    street,
    neighborhood,
    number,
    phone,
    state,
  };

  console.log('🚀 ~ fileList:', fileList);
  if (fileList) {
    body.append('file', fileList[0]);
  }

  body.append('dto', JSON.stringify(dto));

  const updatedBarberShop = await api.put<BarberShopProfile>(
    `/barber-shop/v1/${barberShopId}`,
    body,
  );

  return updatedBarberShop;
};
