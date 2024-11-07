import { FormBarberShop, FormBarberSHopContext, FormHoursBarberShop } from "@/types/formBarberShopContext";
import { createContext, ReactNode, useContext, useState } from "react";

const AppBarberShopContext = createContext<FormBarberSHopContext | undefined>(undefined);

export const valuesBarberShop = {
    name: "",
    cnpj: "",
    cep: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    phone: "",
    street: ""
}

export const FormBarberShopProvider = ({ children }: { children: ReactNode }) => {


  const [formBarberShop, setFormBarberShop] = useState<FormBarberShop>(valuesBarberShop);

  const [hoursBarberShop, setBarberShopHours] = useState<FormHoursBarberShop>({});

  return (
    <AppBarberShopContext.Provider value={{
      formBarberShop,
      setFormBarberShop,
      hoursBarberShop,
      setBarberShopHours,
    }}>
      {children}
    </AppBarberShopContext.Provider>
  );
};

export const useBarberShopContext = () => {
  const context = useContext(AppBarberShopContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
