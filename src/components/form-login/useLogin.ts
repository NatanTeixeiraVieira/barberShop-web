import { useAppContext } from '@/context/appContext';
import { toast } from '@/hooks/useToast';
import { verifyLogin } from '@/services/login';
import { VerifyLoginData, VerifyLogin } from '@/types/login';
import { authenticate } from '@/utils/auth';
import { verifyLoginSchema } from '@/validations/schemas/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const { showPassword, togglePasswordVisibility, setIsAuthenticate } =
    useAppContext();
  const navigate = useNavigate();

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
        const data = await verifyLogin(dto);
        console.log(data);
        return data;
      },

      onSuccess: (data) => {
        const token = data.data.token;
        authenticate(data.data);

        localStorage.setItem('token', token);

        toast({
          title: 'Login realizado com sucesso',
          className: 'h-20',
          variant: 'success',
        });
        setIsAuthenticate(true);
        navigate('/');
      },

      onError: () => {
        toast({
          title: 'Falha ao realizar login',
          className: 'h-20',
          variant: 'error',
        });
        console.log('Erro ao realizar login');
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
