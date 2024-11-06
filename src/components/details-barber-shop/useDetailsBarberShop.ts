import { getBarberShopDetails } from '@/services/serviceBarberShop';
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

  return {
    barberShopServices,
    isLoading,
    isError,
    hasServices,
  };
};

export default useDetailsBarberShop;
