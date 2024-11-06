import { useAppContext } from "@/context/appContext";
import { toast } from "@/hooks/useToast";
import { verifyLogin } from "@/services/login";
import { VerifiLoginData, VerifyLogin } from "@/types/login";
import { verifyLoginSchema } from "@/validations/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export const useLogin = () => {

  const { showPassword, togglePasswordVisibility } = useAppContext();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerifiLoginData>({
    resolver: zodResolver(verifyLoginSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  });



  const {
    mutate: verifyLoginMutatate,
    isPending: isVerifyLoginPending,
  } = useMutation({
    mutationFn: async (dto: VerifyLogin) => {
      await verifyLogin(dto);
      return dto;
    },

    onSuccess: () => {
      toast({
        title: 'Login realizado com sucesso',
        className: 'h-20',
        variant: 'success',
      });
      console.log('Login realizado com sucesso!');
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

  const submit = handleSubmit((data: VerifiLoginData) => {
    verifyLoginMutatate(data);
  });


   return {
    showPassword,
    isVerifyLoginPending,
    errors,
    setValue,
    submit,
    register,
    togglePasswordVisibility,
   }
 }

