import { toast } from '@/hooks/useToast';
import { createBarberShop } from '@/services/barberShop';
import { CreateBarberShopDto, CreateBarberShopFormData, FormBarberShop } from '@/types/barberShop';
import { cepMask, formatCnpj, phoneMask, removeMask } from '@/utils/mask';
import { redirectUser } from '@/utils/redirect';
import { formBarberShopSchema } from '@/validations/schemas/form-barber-shop';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
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


  const valuesBarberShop = {
    name: "",
    cnpj: "",
    cep: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    phone: "",
    street: ""
}

const [formBarberShop, setFormBarberShop] = useState<FormBarberShop>(valuesBarberShop);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
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

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCNPJ = formatCnpj(e.target.value);
    setValue("cnpj", formattedCNPJ);
  };

  const handlePhoneMask = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = phoneMask(e.target.value);
    setValue("phone", formattedPhone)
  }


  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCEP = cepMask(e.target.value);
    setValue("cep", formattedCEP);
  };

  const submit = handleSubmit((data: CreateBarberShopFormData) => {
    data.cnpj = removeMask(getValues("cnpj"));
    data.cep = removeMask(getValues("cep"));
    data.phone = removeMask(getValues("phone"));
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
    handleCNPJChange,
    handleCepChange,
    handlePhoneMask,
  };
};
