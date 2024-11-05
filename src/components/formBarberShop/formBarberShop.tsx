'use client'

import { Button } from "../ui/button"
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { useFormBarberShop } from "./useFormBarberShop";

export default function FormBarberShop() {

  const { handleSubmit, formBarberShop, handleChange, brazilianStates } = useFormBarberShop();

  return (

    <form onSubmit={handleSubmit}>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nomeBarbearia">Nome da Barbearia</Label>
          <Input id="nomeBarbearia" value={formBarberShop.name} onChange={(e) => handleChange('name', e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cnpj">CNPJ</Label>
          <Input id="cnpj" value={formBarberShop.cnpj} onChange={(e) => handleChange('cnpj', e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="estado">Estado</Label>
          <Select onValueChange={(value) => handleChange('state', value)}
            value={formBarberShop.state}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um estado" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup>
                <SelectLabel className="bg-white">Estados</SelectLabel>
                {brazilianStates.map((state) => (
                  <SelectItem key={state.value} value={state.value} className="bg-white">
                    {state.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cep">CEP</Label>
          <Input id="cep" value={formBarberShop.cep} onChange={(e) => handleChange('cep', e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cep">Rua</Label>
          <Input id="rua" value={formBarberShop.street} onChange={(e) => handleChange('street', e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="numero">Número</Label>
          <Input id="numero" value={formBarberShop.number} onChange={(e) => handleChange('number', e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bairro">Bairro</Label>
          <Input id="bairro" value={formBarberShop.neighborhood} onChange={(e) => handleChange('neighborhood', e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cidade">Cidade</Label>
          <Input id="cidade" value={formBarberShop.city} onChange={(e) => handleChange('city', e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefone">Telefone</Label>
          <Input id="telefone" type="tel" value={formBarberShop.phone} onChange={(e) => handleChange('phone', e.target.value)} required />
        </div>
        <div className="p-4">
          <Button type="submit" className="w-full">Cadastrar Barbearia</Button>
        </div>
      </div>
    </form>
  )
}
