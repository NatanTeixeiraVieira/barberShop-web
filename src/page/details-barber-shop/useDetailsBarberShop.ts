import { barberShopProfileCache } from '@/constants/requestCacheNames';
import { toast } from '@/hooks/useToast';
import { getBarberShopProfile } from '@/services/barberShop';
import { createFavoriteBarberShop, deleteFavorite } from '@/services/favorite';
import { getBarberShopDetails } from '@/services/serviceBarberShop';
import { BarberShopProfile } from '@/types/barberShop';
import { BarberShopDetails } from '@/types/barberShopDetails';
import { CreateFavoriteBarberShopDto } from '@/types/favorite-barber-shop';
import { getAuth } from '@/utils/auth';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

const useDetailsBarberShop = () => {
  const { barberShopId } = useParams<{ barberShopId: string }>();
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = () => {
    submit();
    setIsFavorited(true);
  };

  const handleRemoveFavoriteClick = () =>{
    handleRemoveFavoriteDelete()
    setIsFavorited(false);
  }

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

  const auth = useMemo(() => getAuth(), []);


  const { mutate: createFavoriteBarberShopMutate } =
    useMutation({
      mutationFn: async (dto: CreateFavoriteBarberShopDto) => {
        const data = await createFavoriteBarberShop(dto);
        console.log(data);
        return data;
      },

      onSuccess: () => {
        toast({
          title: 'Barbearia adicionada aos favoritos',
          className: 'h-20',
          variant: 'success',
        });
      },

      onError: () => {
        toast({
          title: 'Falha ao adicionar aos favoritos',
          className: 'h-20',
          variant: 'error',
        });
      },
    });

    const {
      mutate: deleteFavoriteMutate,
    } = useMutation({
      mutationFn: async (barberShopId: string) => {
        await deleteFavorite(barberShopId);
      },

      onSuccess: () => {
        toast({
          title: 'Barbearia removida dos favoritos',
          className: 'h-20',
          variant: 'success',
        })
        setIsFavorited(false);
      },

      onError: () => {
        toast({
          title: 'Falha ao remover dos favoritos',
          className: 'h-20',
          variant: 'error',
        });
      },
    });

    const handleRemoveFavoriteDelete = () => {
      if (barberShopId) {
        deleteFavoriteMutate(barberShopId);
      }
    };
    const submit = () => {
      if (!barberShop?.id) {
        console.error("ID da barbearia não encontrado");
        return;
      }

      createFavoriteBarberShopMutate({ barberShopId: barberShop.id });
    };

  return {
    auth,
    barberShopServices,
    barberShop,
    isFetching,
    isLoading,
    isError,
    hasServices,
    isFavorited,
    handleFavoriteClick,
    submit,
    handleConfirmBarberShopDelete: handleRemoveFavoriteDelete,
    handleRemoveFavoriteClick,
  };
};

export default useDetailsBarberShop;
