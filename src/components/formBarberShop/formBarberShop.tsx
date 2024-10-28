'use client'

import { Label } from "@/components/ui/label"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select"
import { useState } from 'react';

export default function FormBarberShop() {
  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
    'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

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
        <Select
          required
          onValueChange={(value) => setSelectedEstado(value)}
          value={selectedEstado}
        >
          <SelectTrigger id="estado" className="border border-gray-300 rounded-md p-2">
            <SelectValue placeholder="Selecione o estado" />
          </SelectTrigger>
          <SelectContent>
            {estados.map((estado) => (
              <SelectItem key={estado} value={estado} className="px-4 py-2 hover:bg-gray-200">
                {estado}
              </SelectItem>
            ))}
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
