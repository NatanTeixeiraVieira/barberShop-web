import { barberShopClient } from '@/constants/requestCacheNames';
import { useAppContext } from '@/context/appContext';
import { getBarberShopClientById } from '@/services/barberShop';
import { BarberShop } from '@/types/barberShop';
import { getAuth, logout } from '@/utils/auth';
import { redirectUser } from '@/utils/redirect';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

const useNavbar = () => {
  const { activeTab, setActiveTab, isAuthenticate, setIsAuthenticate } =
    useAppContext();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
    localStorage.removeItem('token');
    logout();
    setIsAuthenticate(false);
    redirectUser('/', 0);
  };

  const auth = useMemo(() => getAuth(), []);

  return {
    activeTab,
    isAuthenticate,
    auth,
    barberShop,
    activeDropdown,
    handleMouseEnter,
    handleMouseLeave,
    handleClickBarberShop,
    handleClickLogout,
  };
};

export default useNavbar;
