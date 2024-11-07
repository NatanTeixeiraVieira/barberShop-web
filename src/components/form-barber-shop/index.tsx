"use client";

import Spinner from "../Spinner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Toaster } from "../ui/toaster";
import { useFormBarberShop } from "./useFormBarberShop";

export default function FormBarberShop() {
  const {
    submit,
    brazilianStates,
    errors,
    register,
    setValue,
    isCreateBarberShopPending,
  } = useFormBarberShop();

  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nomeBarbearia">Nome da Barbearia</Label>
          <Input {...register("name")} helperText={errors.name?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cnpj">CNPJ</Label>
          <Input {...register("cnpj")} helperText={errors.cnpj?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="estado">Estado</Label>
          <Select onValueChange={(value) => setValue("state", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um estado" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup>
                <SelectLabel className="bg-white">Estados</SelectLabel>
                {brazilianStates.map((state) => (
                  <SelectItem
                    key={state.value}
                    value={state.value}
                    className="bg-white"
                  >
                    {state.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <span className="text-xs text-error">{errors.state?.message}</span>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cep">CEP</Label>
          <Input {...register("cep")} helperText={errors.cep?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="street">Rua</Label>
          <Input {...register("street")} helperText={errors.street?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="numero">Número</Label>
          <Input {...register("number")} helperText={errors.number?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bairro">Bairro</Label>
          <Input
            {...register("neighborhood")}
            helperText={errors.neighborhood?.message}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cidade">Cidade</Label>
          <Input {...register("city")} helperText={errors.city?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefone">Telefone</Label>
          <Input {...register("phone")} helperText={errors.phone?.message} />
        </div>
        <div className="p-4">
          <Button type="submit" className="w-full">
            {isCreateBarberShopPending ? <Spinner size="sm" /> : "Cadastrar Barbearia"}
          </Button>
        </div>
      </div>
      <Toaster/>
    </form>
  );
}
