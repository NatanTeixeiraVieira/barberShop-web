import { brazilianStates, statesMapper } from '@/constants/mappers';
import { addressByCepCache } from '@/constants/requestCacheNames';
import { toast } from '@/hooks/useToast';
import { createBarberShop } from '@/services/barberShop';
import { getAddressByCepNumber } from '@/services/cep';
import {
  CreateBarberShopDto,
  CreateBarberShopFormData,
  FormBarberShop,
} from '@/types/barberShop';
import { Cep } from '@/types/cep';
import { cepMask, cnpjMask, phoneMask, removeMask } from '@/utils/mask';
import { redirectUser } from '@/utils/redirect';
import { formBarberShopSchema } from '@/validations/schemas/form-barber-shop';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const useFormBarberShop = () => {
  const valuesBarberShop = {
    name: '',
    cnpj: '',
    cep: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    phone: '',
    street: '',
  };

  const [formBarberShop, setFormBarberShop] =
    useState<FormBarberShop>(valuesBarberShop);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateBarberShopFormData>({
    resolver: zodResolver(formBarberShopSchema),
    defaultValues: {
      name: '',
      cnpj: '',
      cep: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      phone: '',
      street: '',
    },
  });

  const cep = watch('cep');
  const state = watch('state');

  const queryClient = useQueryClient();

  const {
    data: addressByCep,
    refetch: refetchGetAddressByCepNumber,
    error,
  } = useQuery<Cep>({
    queryKey: [addressByCepCache],
    queryFn: async () => (await getAddressByCepNumber(cep)).data,

    retry: false,
    refetchOnWindowFocus: false,
    enabled: false,
  });
  console.log('🚀 ~ useFormBarberShop ~ addressByCep:', addressByCep);

  useEffect(() => {
    const cepWithMaskLength = 9;

    if (cep.length === cepWithMaskLength) {
      refetchGetAddressByCepNumber();
    }
  }, [cep, refetchGetAddressByCepNumber]);

  useEffect(() => {
    if (addressByCep) {
      setValue('city', addressByCep.city);
      setValue('state', addressByCep.state);
      setValue('neighborhood', addressByCep.neighborhood);
      setValue('street', addressByCep.street);
      return;
    }
  }, [addressByCep, setValue]);

  useEffect(() => {
    if (error) {
      queryClient.setQueryData([addressByCepCache], null);
      setValue('city', '');
      setValue('state', '');
      setValue('neighborhood', '');
      setValue('street', '');
    }
  }, [error, queryClient, setValue]);

  const handleChange = (field: string, value: string) => {
    setFormBarberShop((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const {
    mutate: createBarberShopMutate,
    isPending: isCreateBarberShopPending,
  } = useMutation({
    mutationFn: async (dto: CreateBarberShopDto) => {
      await createBarberShop(dto);
    },
    onSuccess: () => {
      toast({
        title: 'Barbearia criada com sucesso',
        className: 'h-20',
        variant: 'success',
      });
      reset();
      redirectUser(`/`, 1);
    },
    onError: () => {
      toast({
        title: 'Falha ao cadastrar barbearia',
        className: 'h-20',
        variant: 'error',
      });
    },
  });

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCNPJ = cnpjMask(e.target.value);
    setValue('cnpj', formattedCNPJ);
  };

  const handlePhoneMask = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = phoneMask(e.target.value);
    setValue('phone', formattedPhone);
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCEP = cepMask(e.target.value);
    setValue('cep', formattedCEP);
  };

  const submit = handleSubmit((data: CreateBarberShopFormData) => {
    data.cnpj = removeMask(getValues('cnpj'))!;
    data.cep = removeMask(getValues('cep'))!;
    data.phone = removeMask(getValues('phone'))!;
    createBarberShopMutate(data);
  });

  return {
    isCreateBarberShopPending,
    formBarberShop,
    state,
    errors,
    brazilianStates,
    handleChange,
    submit,
    register,
    setValue,
    handleCNPJChange,
    handleCepChange,
    handlePhoneMask,
  };
};
