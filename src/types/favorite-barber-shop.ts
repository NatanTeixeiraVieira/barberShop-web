import { PaginationDto } from "./pagination";

export type CreateFavoriteBarberShopDto = {
  barberShopId: string;
}

export type FavoriteList = {
  id: string;
  name: string;
  photoUrl: string;
  rating: number;
}

export type getFavoriteClientById = PaginationDto
