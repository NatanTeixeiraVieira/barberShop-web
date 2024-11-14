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
  const {
    showPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    showConfirmPassword,
  } = useAppContext();

  // estado para pegar os caracteres que estão sendo digitados;
  const [password, setPassword] = useState('');

  // estado para validação dos caracteres digitados no input
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  //Utilização do react hook form para iniciar os campos dos inputs vazios
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    setValidations({
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      number: /\d/.test(value),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    });
  };
  return {
    errors,
    password,
    validations,
    showPassword,
    showConfirmPassword,
    isCreateClientPending,
    submit,
    register,
    setValue,
    handlePasswordChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  };
};
