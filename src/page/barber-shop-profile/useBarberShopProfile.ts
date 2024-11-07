import {
  addressByCepCache,
  barberShopProfileCache,
} from '@/constants/requestCacheNames';
import {
  getBarberShopProfile,
  updateBarberShopProfile,
} from '@/services/barberShop';
import {
  BarberShopProfile,
  BarberShopProfileFormData,
  UpdateBarberShopProfileDto,
} from '@/types/barberShop';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { barberShopProfileSchema } from '@/validations/schemas/barberShopProfile';
import { useParams } from 'react-router-dom';
import { Cep } from '@/types/cep';
import { getAddressByCepNumber } from '@/services/cep';
import { statesMapper } from '@/constants/mappers';

export const useBarberShopProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { barberShopId } = useParams();

  const [avatarImage, setAvatarImage] = useState('');

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BarberShopProfileFormData>({
    resolver: zodResolver(barberShopProfileSchema),
    defaultValues: {
      cep: '',
      city: '',
      cnpj: '',
      name: '',
      neighborhood: '',
      street: '',
      number: '',
      phone: '',
      state: '',
    },
  });

  const cep = watch('cep');

  const { data: addressByCep, refetch: refetchGetAddressByCepNumber } =
    useQuery<Cep>({
      queryKey: [addressByCepCache],
      queryFn: async () => (await getAddressByCepNumber(cep)).data,

      retry: false,
      refetchOnWindowFocus: false,
      enabled: false,
    });

  const {
    mutate: updateBarberShopProfileMutatate,
    isPending: isUpdateBarberShopProfilePending,
  } = useMutation({
    mutationFn: async (dto: UpdateBarberShopProfileDto) => {
      await updateBarberShopProfile(dto);
      return dto;
    },
    onSuccess: (_, variables) => {
      setIsEditing(false);
      queryClient.setQueryData<BarberShopProfile>(
        [barberShopProfileCache],
        (previousCache) => {
          if (previousCache) {
            return {
              ...previousCache,
              ...variables,
              id: variables.barberShopId,
            };
          }

          return previousCache;
        },
      );
    },

    onError: () => {},
  });

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

  useEffect(() => {
    if (barberShop) {
      setAvatarImage(barberShop.photoUrl);
    }
  }, [barberShop]);

  useEffect(() => {
    if (cep.length === 8) {
      refetchGetAddressByCepNumber();
    }
  }, [cep, refetchGetAddressByCepNumber]);

  useEffect(() => {
    if (addressByCep) {
      setValue('city', addressByCep.city);
      setValue('neighborhood', addressByCep.neighborhood);
      setValue('state', statesMapper[addressByCep.state]);
      setValue('street', addressByCep.street);
    }
  }, [addressByCep, setValue]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const submit = handleSubmit((data: BarberShopProfileFormData) => {
    if (barberShopId) {
      updateBarberShopProfileMutatate({
        barberShopId,
        fileList: data.file,
        ...data,
      });
    }
  });

  const handleToggleEdit = () => {
    if (isEditing) {
      submit();
      return;
    }

    if (barberShop) {
      Object.entries(barberShop).forEach(([key, value]) => {
        setValue(
          key as keyof BarberShopProfileFormData,
          value?.toString() ?? '',
        );
      });
    }

    setIsEditing(!isEditing);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderAddress = () => {
    const addressParts = [
      barberShop?.street,
      barberShop?.number,
      barberShop?.neighborhood,
      barberShop?.city,
      barberShop?.state,
      barberShop?.cep,
    ].filter(Boolean);

    return addressParts.length > 0
      ? addressParts.join(', ')
      : 'Address not provided';
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const formatCNPJ = (cnpj: string) => {
    return cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5',
    );
  };

  return {
    barberShop,
    isEditing,
    fileInputRef,
    isLoading: isFetching,
    errors,
    avatarImage,
    register,
    renderAddress,
    toggleEdit: handleToggleEdit,
    handleImageUpload,
    triggerFileInput,
    formatCNPJ,
  };
};
