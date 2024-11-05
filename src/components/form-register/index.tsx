import { useAppContext } from "@/context/appContext"
import { Button } from "../ui/button";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";

export default function FormRegister() {

  const {showPassword, togglePasswordVisibility} = useAppContext();

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setRegisterForm({
      ...registerForm,
      [name]: value,
    })
  }

  const handleSubmit = async  (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3333/api/client/v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerForm),
      });

      if(response.ok) {
        const data = await response.json();
        console.log('Cliente registrado com secesso: ', data)
      } else {
        console.log('Erro ao registrar cliente: ', response.statusText);
      }
    } catch (error) {
      console.log('Erro de conexão com backend: ', error)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className="grid w-full items-center gap-4">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="register-name">Nome</Label>
        <div className="relative">
          <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="register-name"
            name="name"
            value={registerForm.name}
            onChange={handleInputChange}
            placeholder="Seu nome"
            className="pl-8"
            required
          />
        </div>
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="register-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="register-email"
            type="email"
            name="email"
            value={registerForm.email}
            onChange={handleInputChange}
            placeholder="seu@email.com"
            className="pl-8"
            required
          />
        </div>
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="register-password">Senha</Label>
        <div className="relative ">
          <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="register-password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={registerForm.password}
            onChange={handleInputChange}
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
      Cadastrar
    </Button>
  </form>
  )
}
