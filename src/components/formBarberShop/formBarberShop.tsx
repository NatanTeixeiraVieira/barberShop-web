'use client'

import { Label } from "@/components/ui/label"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"
import { useState } from 'react';
import { SelectGroup, SelectLabel } from "../ui/select";

export default function FormBarberShop() {
  const brazilianStates = [
    { value: "AC", label: "Acre" },
    { value: "AL", label: "Alagoas" },
    { value: "AP", label: "Amapá" },
    { value: "AM", label: "Amazonas" },
    { value: "BA", label: "Bahia" },
    { value: "CE", label: "Ceará" },
    { value: "DF", label: "Distrito Federal" },
    { value: "ES", label: "Espírito Santo" },
    { value: "GO", label: "Goiás" },
    { value: "MA", label: "Maranhão" },
    { value: "MT", label: "Mato Grosso" },
    { value: "MS", label: "Mato Grosso do Sul" },
    { value: "MG", label: "Minas Gerais" },
    { value: "PA", label: "Pará" },
    { value: "PB", label: "Paraíba" },
    { value: "PR", label: "Paraná" },
    { value: "PE", label: "Pernambuco" },
    { value: "PI", label: "Piauí" },
    { value: "RJ", label: "Rio de Janeiro" },
    { value: "RN", label: "Rio Grande do Norte" },
    { value: "RS", label: "Rio Grande do Sul" },
    { value: "RO", label: "Rondônia" },
    { value: "RR", label: "Roraima" },
    { value: "SC", label: "Santa Catarina" },
    { value: "SP", label: "São Paulo" },
    { value: "SE", label: "Sergipe" },
    { value: "TO", label: "Tocantins" },
  ]

  const [selectedEstado, setSelectedEstado] = useState("");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="nomeBarbearia">Nome da Barbearia</Label>
        <Input id="nomeBarbearia" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cnpj">CNPJ</Label>
        <Input id="cnpj" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cep">CEP</Label>
        <Input id="cep" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="numero">Número</Label>
        <Input id="numero" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bairro">Bairro</Label>
        <Input id="bairro" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cidade">Cidade</Label>
        <Input id="cidade" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="estado">Estado</Label>
        <Select onValueChange={(e) => setSelectedEstado(e)}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Selecione um estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Estados</SelectLabel>
              {brazilianStates.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="telefone">Telefone</Label>
        <Input id="telefone" type="tel" required />
      </div>
    </div>
  );
}
