import { useAppContext } from "@/context/appContext";
import { Label } from "@radix-ui/react-label";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import React, { useState } from "react";

export default function FormLogin() {

  const { showPassword, togglePasswordVisibility } = useAppContext();
  const [authForm, setAuthForm] = useState({
    email: '',
    password: ''
  })

  const handleAuthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setAuthForm({
      ...authForm,
      [name]: value
    })
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        name="email"
                        value={authForm.email}
                        onChange={handleAuthChange}
                        placeholder="seu@email.com"
                        className="pl-8"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="login-password">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={authForm.password}
                        onChange={handleAuthChange}
                        className="pl-8 pr-8"
                        required
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
                  Entrar
                </Button>
              </form>
  )
}
