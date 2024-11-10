import { barberListCache } from '@/constants/requestCacheNames';
import { getBarberShopList } from '@/services/barberShop';
import { ListBarberShop } from '@/types/barberShop';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

export const useHome = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const {
    data: barberShop,
    refetch: refetchBarberShop,
    isFetching,
  } = useQuery<ListBarberShop>({
    queryKey: [barberListCache],
    queryFn: async () =>
      (
        await getBarberShopList(
          { page: currentPage },
          searchInputRef.current?.value,
        )
      ).data,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const handleLoadMore = () => {
    setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
  };

  const handleSearchBarber = () => {
    refetchBarberShop();
  };

  useEffect(() => {
    refetchBarberShop();
  }, [currentPage, refetchBarberShop]);

  return {
    currentPage,
    barberShop,
    searchInputRef,
    isFetching,
    handleSearchBarber,
    handleLoadMore,
  };
};
