import { useAppContext } from "@/context/appContext";
import { Label } from "@radix-ui/react-label";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FormLogin() {

  const { showPassword, togglePasswordVisibility } = useAppContext();
  const [authForm, setAuthForm] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();


  const handleAuthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setAuthForm({
      ...authForm,
      [name]: value
    })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3333/api/auth/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authForm),
      });

      if (!response.ok) {
        throw new Error("Email ou senha inválidos");
      }

      const loginOutput = await response.json();
      console.log("autenticação realizada com sucesso:", loginOutput);

      // Salve o token e redirecione o usuário
      localStorage.setItem("authToken", loginOutput.token);
      navigate("/details-barber-shop"); // Redirecione para a página desejada

    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
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
