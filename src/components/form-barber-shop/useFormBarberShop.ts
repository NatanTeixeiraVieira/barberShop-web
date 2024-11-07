import {
  useBarberShopContext,
} from '@/context/formBarberShopContext';
import { useToast } from '@/hooks/useToast';
import { createBarberShop } from '@/services/barberShop';
import {
  CreateBarberShopDto,
  CreateBarberShopFormData,
} from '@/types/barberShop';
import { formBarberShopSchema } from '@/validations/schemas/form-barber-shop';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
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
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
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

  const handleChange = (field: string, value: string) => {
    setFormBarberShop((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const {
    mutate: createBarberShopMutatate,
    isPending: isCreateBarberShopPending,
  } = useMutation({
    mutationFn: async (dto: CreateBarberShopDto) => {
      await createBarberShop(dto);
      return dto;
    },

    onSuccess: () => {
      toast({
        title: 'Barbeiro criado com sucesso',
        className: 'h-20',
        variant: 'success',
      });
      reset();
    },

    onError: () => {
      toast({
        title: 'Falha ao cadastrar barbearia',
        className: 'h-20',
        variant: 'error',
      });
    },
  });

  const submit = handleSubmit((data: CreateBarberShopFormData) => {
    createBarberShopMutatate(data);
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
