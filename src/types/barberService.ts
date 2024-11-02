export type BarberShopService = {
  id: string;
  name: string;
  price: number;
  duration: number;
  barberShopId: string;
};

export type UpsertBarberShopService = {
  name: string;
  price: number;
  duration: number;
  barberShopId: string;
};

export type CreateBarberShopService = UpsertBarberShopService;

export type UpdateBarberShopService = UpsertBarberShopService & {
  id: string;
};

export type BarberShopServicesList = BarberShopService[];
