'use client'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select"
import { useBarberShopContext } from "@/context/formBarberShopContext"

export default function FormBarberShop() {

  const { formBarberShop, setFormBarberShop } = useBarberShopContext();

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

  const handleChange = (field: string, value: string) => {
    setFormBarberShop((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <SelectContent>
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
    </div>
  )
}
