export type FormBarberShop = {
  name: string;
  cnpj: string;
  cep: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  phone: string;
  street: string;
};

export type FormHoursBarberShop = {
  [key: string]: {
    start: string; end: string
  };
};

export type FormBarberSHopContext = {
  formBarberShop: FormBarberShop;
  setFormBarberShop: React.Dispatch<React.SetStateAction<FormBarberShop>>;
  hoursBarberShop: FormHoursBarberShop;
  setBarberShopHours: React.Dispatch<React.SetStateAction<FormHoursBarberShop>>;
}
