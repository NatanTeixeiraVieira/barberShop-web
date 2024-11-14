import { CreateFavoriteBarberShopDto, getFavoriteClientById } from "@/types/favorite-barber-shop";
import { api } from "./api";
import { BarberShop } from "@/types/barberShop";

export const createFavoriteBarberShop = async (dto: CreateFavoriteBarberShopDto) => {
  const client = await api.post<BarberShop>('/favorite/v1/create-favorite', dto);

  return client;
};

export const getFavoriteList = async (dto: getFavoriteClientById) => {
  const pagination = dto ?? { limit: 20, page: 1 };


  const clientFavorite = await api.get<BarberShop>(
    `/favorite/v1`,
  );


  return clientFavorite;
};

export const deleteFavorite = async (barberShopId: string) => {
  await api.delete(`/favorite/v1/${barberShopId}`);
};
