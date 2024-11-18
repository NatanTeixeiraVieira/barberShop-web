import { barberShopClient } from '@/constants/requestCacheNames';
import { useAppContext } from '@/context/appContext';
import { logout } from '@/services/auth';
import { getBarberShopClientById } from '@/services/barberShop';
import { BarberShop } from '@/types/barberShop';
import { getAuth } from '@/utils/auth';
import { redirectUser } from '@/utils/redirect';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

export const useNavbar = () => {
  const { activeTab, setActiveTab, isAuthenticate, setIsAuthenticate } =
    useAppContext();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const handleMouseEnter = (dropdownName: string) => {
    setActiveDropdown(dropdownName);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const { data: barberShop } = useQuery<BarberShop>({
    queryKey: [barberShopClient],
    queryFn: async () => (await getBarberShopClientById()).data,

    retry: false,
    refetchOnWindowFocus: false,
  });
  console.log('🚀 ~ useNavbar ~ barberShop:', barberShop);

  const handleClickBarberShop = () => {
    setActiveTab('barber');
  };

  const handleClickLogout = () => {
    logout();
    setIsAuthenticate(false);
    redirectUser('/', 0);
  };

  const auth = useMemo(() => getAuth(), []);
  console.log('🚀 ~ useNavbar ~ auth:', auth);

  return {
    activeTab,
    isAuthenticate,
    openMenu,
    auth,
    barberShop,
    activeDropdown,
    toggleMenu,
    handleMouseEnter,
    handleMouseLeave,
    handleClickBarberShop,
    handleClickLogout,
  };
};
