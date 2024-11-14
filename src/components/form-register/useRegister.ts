import { useAppContext } from '@/context/appContext';
import { toast } from '@/hooks/useToast';
import { createClient } from '@/services/client';
import { ClientRegisterData, CreateClientDto } from '@/types/client';
import { redirectUser } from '@/utils/redirect';
import { formClientSchema } from '@/validations/schemas/form-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useRegister = () => {
  const { showPassword, togglePasswordVisibility } = useAppContext();

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ClientRegisterData>({
    resolver: zodResolver(formClientSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const { mutate: createClientMutatate, isPending: isCreateClientPending } =
    useMutation({
      mutationFn: async (dto: CreateClientDto) => {
        await createClient(dto);
        return dto;
      },

      onSuccess: () => {
        toast({
          title: 'cadastro realizado com sucesso',
          className: 'h-20',
          variant: 'success',
        });
        reset();
        redirectUser('/auth/login', 1);
      },

      onError: () => {
        toast({
          title: 'Falha ao realizar cadastro',
          className: 'h-20',
          variant: 'error',
        });
      },
    });

  const submit = handleSubmit((data: ClientRegisterData) => {
    createClientMutatate(data);
  });
  return {
    showPassword,
    isCreateClientPending,
    errors,
    register,
    setValue,
    togglePasswordVisibility,
    handleInputChange,
    submit,
  };
};
