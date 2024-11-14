import {
  addressByCepCache,
  barberShopProfileCache,
} from '@/constants/requestCacheNames';
import {
  deleteBarberShop,
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
import { useNavigate, useParams } from 'react-router-dom';
import { Cep } from '@/types/cep';
import { getAddressByCepNumber } from '@/services/cep';
import { statesMapper } from '@/constants/mappers';
import { toast } from '@/hooks/useToast';
export const useBarberShopProfile = () => {
  const { barberShopId } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [avatarImage, setAvatarImage] = useState('');
  const [isConfirmDeleteBarberDialogOpen, setIsConfirmDeleteBarberDialogOpen] =
    useState(false);

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

  const { mutate: updateBarberShopProfileMutate } = useMutation({
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

  const {
    mutate: deleteBarberShopMutate,
    isPending: isDeleteBarberShopPending,
  } = useMutation({
    mutationFn: async (barberShopId: string) => {
      await deleteBarberShop(barberShopId);
    },

    onSuccess: () => {
      navigate('/');
    },

    onError: () => {
      toast({
        title: 'Falha ao deletar barbeiro',
        className: 'h-20',
        variant: 'error',
      });
    },
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
      updateBarberShopProfileMutate({
        barberShopId,
        fileList: data.file,
        ...data,
      });
    }
  });

  const handleCancelEdit = () => {
    if (barberShop) {
      Object.entries(barberShop).forEach(([key, value]) => {
        setValue(
          key as keyof BarberShopProfileFormData,
          value?.toString() ?? '',
        );
      });
    }

    // Encerra o modo de edição
    setIsEditing(false);
  };

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

  const handleDeleteBarberShopButtonClick = () => {
    setIsConfirmDeleteBarberDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsConfirmDeleteBarberDialogOpen(false);
  };

  const handleConfirmBarberShopDelete = () => {
    if (barberShopId) {
      deleteBarberShopMutate(barberShopId);
    }
  };

  return {
    errors,
    isEditing,
    barberShop,
    isFetching,
    avatarImage,
    fileInputRef,
    isDeleteBarberShopPending,
    isConfirmDeleteBarberDialogOpen,
    register,
    formatCNPJ,
    renderAddress,
    handleCancelEdit,
    handleToggleEdit,
    triggerFileInput,
    handleImageUpload,
    handleCloseDeleteDialog,
    handleConfirmBarberShopDelete,
    handleDeleteBarberShopButtonClick,
  };
};
