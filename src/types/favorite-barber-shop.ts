import { BarberShop } from "./barberShop";
import { Pagination, PaginationDto } from "./pagination";

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

export type ClientFavoriteListPaginated = Pagination<ClientFavoriteList>

export type ClientFavoriteList = {
  barberShop: BarberShop;
  clientId: string
}
