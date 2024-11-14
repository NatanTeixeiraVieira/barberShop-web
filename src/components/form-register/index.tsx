import { Button } from "../ui/button";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRegister } from "./useRegister";
import Spinner from "../Spinner";
import { Toaster } from "../ui/toaster";

export default function FormRegister() {
  const {
    errors,
    validations,
    showPassword,
    showConfirmPassword,
    isCreateClientPending,
    submit,
    register,
    handlePasswordChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = useRegister();


  return (
    <form onSubmit={submit}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="register-name">Nome</Label>
          <div className="relative">
            <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              {...register("name")}
              helperText={errors.name?.message}
              placeholder="Seu nome"
              className="pl-8"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="register-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              {...register("email")}
              helperText={errors.email?.message}
              placeholder="seu@email.com"
              className="pl-8"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="register-password">Senha</Label>
          <div className="relative">
            <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type={showPassword ? 'text' : 'password'}
              {...register('password')} // Registrando o campo
              onChange={handlePasswordChange}
              placeholder="***************"
              helperText={errors.password?.message || ''}
              className="pl-8 pr-8"
            />
            <div
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </div>

            <div className="flex flex-col space-y-1.5 mt-2 text-sm">
              <div
                className={`flex items-center space-x-2 ${validations.length ? 'text-green-500' : 'text-red-500'
                  }`}
              >
                <span className={`h-1 w-1 rounded-full ${validations.length ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span>Pelo menos 8 caracteres</span>
              </div>
              <div
                className={`flex items-center space-x-2 ${validations.uppercase ? 'text-green-500' : 'text-red-500'
                  }`}
              >
                <span className={`h-1 w-1 rounded-full ${validations.uppercase ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span>Pelo menos uma letra maiúscula</span>
              </div>
              <div
                className={`flex items-center space-x-2 ${validations.number ? 'text-green-500' : 'text-red-500'
                  }`}
              >
                <span className={`h-1 w-1 rounded-full ${validations.number ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span>Pelo menos um número</span>
              </div>
              <div
                className={`flex items-center space-x-2 ${validations.specialChar ? 'text-green-500' : 'text-red-500'
                  }`}
              >
                <span className={`h-1 w-1 rounded-full ${validations.specialChar ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span>Pelo menos um caractere especial</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="register-confirm-password">Confirme sua Senha</Label>
          <div className="relative">
            <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              placeholder="***************"
              helperText={errors.confirmPassword?.message}
              className="pl-8 pr-8"
            />
            <div
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </div>
          </div>
        </div>
      </div>
      <Button className="w-full mt-4" type="submit">
        {isCreateClientPending ? <Spinner size="sm" /> : "Cadastrar"}
      </Button>
      <Toaster />
    </form>
  );
}
