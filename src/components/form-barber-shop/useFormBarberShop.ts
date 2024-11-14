import { statesMapper } from '@/constants/mappers';
import { addressByCepCache } from '@/constants/requestCacheNames';
import { useBarberShopContext } from '@/context/formBarberShopContext';
import { toast } from '@/hooks/useToast';
import { createBarberShop } from '@/services/barberShop';
import { getAddressByCepNumber } from '@/services/cep';
import { CreateBarberShopDto, CreateBarberShopFormData } from '@/types/barberShop';
import { Cep } from '@/types/cep';
import { redirectUser } from '@/utils/redirect';
import { formBarberShopSchema } from '@/validations/schemas/form-barber-shop';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const brazilianStates = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

export const useFormBarberShop = () => {
  const { formBarberShop, setFormBarberShop } = useBarberShopContext();

  const {
    register,
    handleSubmit,
    setValue,
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

  const { data: addressByCep, refetch: refetchGetAddressByCepNumber } =
    useQuery<Cep>({
      queryKey: [addressByCepCache, cep],
      queryFn: async () => (await getAddressByCepNumber(cep)).data,
      retry: false,
      refetchOnWindowFocus: false,
      enabled: cep.length === 8,  // Apenas ativa se o CEP tiver 8 caracteres
    });

  const handleChange = (field: string, value: string) => {
    setFormBarberShop((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const { mutate: createBarberShopMutate, isPending: isCreateBarberShopPending } = useMutation({
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

  useEffect(() => {
    if (addressByCep) {
      setValue('city', addressByCep.city);
      setValue('neighborhood', addressByCep.neighborhood);
      setValue('state', statesMapper[addressByCep.state]);
      setValue('street', addressByCep.street);
    }
  }, [addressByCep, setValue]);

  const submit = handleSubmit((data: CreateBarberShopFormData) => {
    createBarberShopMutate(data);
  });

  return {
    isCreateBarberShopPending,
    formBarberShop,
    handleChange,
    submit,
    brazilianStates,
    register,
    errors,
    setValue,
  };
};
