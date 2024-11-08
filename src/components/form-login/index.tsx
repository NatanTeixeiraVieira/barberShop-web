import { Label } from "@radix-ui/react-label";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useLogin } from "./useLogin";
import Spinner from "../Spinner";

export default function FormLogin() {

  const {
    showPassword,
    isVerifyLoginPending,
    errors,
    submit,
    register,
    togglePasswordVisibility,
  } = useLogin();

  return (
    <form onSubmit={submit}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="login-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              {...register('email')}
              helperText={errors.email?.message}

              placeholder="seu@email.com"
              className="pl-8"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="login-password">Senha</Label>
          <div className="relative">
            <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
            type={`${showPassword === false ? 'password' : 'text'}`}
              {...register('password')}
              helperText={errors.password?.message}
              className="pl-8 pr-8"
            />
            <div
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </div>
          </div>
        </div>
      </div>
      <Button className="w-full mt-4" type="submit">
        {isVerifyLoginPending ? <Spinner size="sm" /> : 'Entrar'}
      </Button>
    </form>
  )
}
