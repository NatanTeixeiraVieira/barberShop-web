import { barberShopAppointmentsListCache } from '@/constants/requestCacheNames';
import { usePagination } from '@/hooks/usePagination';
import { getBarberShopAppointment } from '@/services/appointment';
import { ListBarberShopAppointments } from '@/types/appointment';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const useBarberAppointments = () => {
  const { barberShopId } = useParams();

  const {
    data: barberShopAppointments,
    refetch: refetchBarberShopAppointments,
  } = useQuery<ListBarberShopAppointments>({
    queryKey: [barberShopAppointmentsListCache],

    queryFn: async () =>
      (
        await getBarberShopAppointment({
          page: currentPage,
          barberShopId: barberShopId!,
        })
      ).data,

    retry: false,
    refetchOnWindowFocus: false,
  });

  const { currentPage, handleLoadMore } = usePagination({
    refetch: refetchBarberShopAppointments,
  });

  return {
    barberShopAppointments,
    handleLoadMore,
  };
};
