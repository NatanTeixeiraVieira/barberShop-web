import { barberListCache } from '@/constants/requestCacheNames';
import { getBarberShopList } from '@/services/barberShop';
import { ListBarberShop } from '@/types/barberShop';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useHome = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: barberShop, refetch: refetchBarberShop } =
    useQuery<ListBarberShop>({
      queryKey: [barberListCache],
      queryFn: async () =>
        (await getBarberShopList({ page: currentPage })).data,
      retry: false,
      refetchOnWindowFocus: false,
    });

  const handleLoadMore = () => {
    setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
  };

  useEffect(() => {
    refetchBarberShop();
  }, [currentPage, refetchBarberShop]);

  return {
    currentPage,
    barberShop,
    handleLoadMore,
  };
};
