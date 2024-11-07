import { barberShopProfileCache } from '@/constants/requestCacheNames';
import { getBarberShopProfile } from '@/services/barberShop';
import { getBarberShopDetails } from '@/services/serviceBarberShop';
import { BarberShopProfile } from '@/types/barberShop';
import { BarberShopDetails } from '@/types/barberShopDetails';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const useDetailsBarberShop = () => {
  const { barberShopId } = useParams<{ barberShopId: string }>();

  if (!barberShopId) {
    throw new Error('BarberShop ID não encontrado na URL.');
  }

  const {
    data: barberShopServices,
    isLoading,
    isError,
  } = useQuery<BarberShopDetails[]>({
    queryKey: ['barberShopServices', barberShopId],
    queryFn: () => getBarberShopDetails(barberShopId),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!barberShopId,
  });

  const hasServices =
    Array.isArray(barberShopServices) && barberShopServices.length > 0;

  const { data: barberShop, isFetching } = useQuery<BarberShopProfile>({
    queryKey: [barberShopProfileCache],
    queryFn: async () =>
      (
        await getBarberShopProfile({
          id: barberShopId!,
        })
      ).data,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    barberShopServices,
    barberShop,
    isFetching,
    isLoading,
    isError,
    hasServices,
  };
};

export default useDetailsBarberShop;
