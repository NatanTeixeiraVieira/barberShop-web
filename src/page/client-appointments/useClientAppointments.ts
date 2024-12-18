import { clientAppointmentsListCache } from '@/constants/requestCacheNames';
import { usePagination } from '@/hooks/usePagination';
import { useTitle } from '@/hooks/useTitle';
import { getClientAppointment } from '@/services/appointment';
import { ListClientAppointments } from '@/types/appointment';
import { useQuery } from '@tanstack/react-query';

export const useClientAppointments = () => {
  useTitle('Agendamentos cliente');

  const { data: clientAppointments, refetch: refetchClientAppointments } =
    useQuery<ListClientAppointments>({
      queryKey: [clientAppointmentsListCache],
      queryFn: async () =>
        (
          await getClientAppointment({
            page: currentPage,
          })
        ).data,
      retry: false,
      refetchOnWindowFocus: false,
    });

  const { currentPage, handleLoadMore } = usePagination({
    refetch: refetchClientAppointments,
  });

  return {
    clientAppointments,
    handleLoadMore,
  };
};
