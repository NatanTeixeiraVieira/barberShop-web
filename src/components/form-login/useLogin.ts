import { useAppContext } from '@/context/appContext';
import { toast } from '@/hooks/useToast';
import { login } from '@/services/auth';
import { VerifyLoginData, VerifyLogin } from '@/types/login';
import { authenticate } from '@/utils/auth';
import { redirectUser } from '@/utils/redirect';
import { verifyLoginSchema } from '@/validations/schemas/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

export const useLogin = () => {
  const { showPassword, togglePasswordVisibility, setIsAuthenticate } =
    useAppContext();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerifyLoginData>({
    resolver: zodResolver(verifyLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: verifyLoginMutate, isPending: isVerifyLoginPending } =
    useMutation({
      mutationFn: async (dto: VerifyLogin) => {
        const data = await login(dto);
        console.log(data);
        return data;
      },

      onSuccess: () => {
        toast({
          title: 'Login realizado com sucesso',
          className: 'h-20',
          variant: 'success',
        });
        setIsAuthenticate(true);
        redirectUser('/', 0.5);
      },

      onError: () => {
        toast({
          title: 'Email ou senha inválidos',
          className: 'h-20',
          variant: 'error',
        });
      },
    });

  const submit = handleSubmit((data: VerifyLoginData) => {
    verifyLoginMutate(data);
  });

  return {
    showPassword,
    isVerifyLoginPending,
    errors,
    setValue,
    submit,
    register,
    togglePasswordVisibility,
  };
};
