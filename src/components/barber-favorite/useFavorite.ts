import { favoriteListClient } from '@/constants/requestCacheNames';
import { getFavoriteList } from '@/services/favorite';
import { BarberShop } from '@/types/barberShop';
import { getAuth } from '@/utils/auth';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

const useFavorite = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const auth = useMemo(() => getAuth(), []);


  const {
    data: favoriteList,
    refetch: refetchFavoriteList,
    isFetching,
  } = useQuery<BarberShop>({
    queryKey: [favoriteListClient, currentPage],
    queryFn: async () =>
      (
        await getFavoriteList({ page: currentPage })
      ).data,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const handleLoadMore = () => {
    setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
  };

  const handleSearchBarber = () => {
    refetchFavoriteList();
  };

  useEffect(() => {
    refetchFavoriteList();
  }, [currentPage, refetchFavoriteList]);

  return {
    favoriteList,
    isFetching,
    auth,
    handleSearchBarber,
    refetchFavoriteList,
    handleLoadMore,
  };
};

export default useFavorite;
