import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const timeOptions = Array.from({ length: 288 }, (_, i) => {
  const hours = Math.floor(i / 12).toString().padStart(2, '0')
  const minutes = (i % 12 * 5).toString().padStart(2, '0')
  return `${hours}:${minutes}`
})

const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']

export default function FormBarberShop() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    cnpj: '',
    cep: '',
    number: '',
    bairro: '',
    cidade: '',
    estado: '',
    telefone: '',
    hours: Object.fromEntries(daysOfWeek.map(day => [day, { start: '08:00', end: '18:00' }]))
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleTimeChange = (day: string, type: 'start' | 'end', value: string) => {
    setFormData(prev => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: { ...prev.hours[day], [type]: value }
      }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    // Here you would typically send the data to your backend
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white my-4">
      <CardHeader>
        <CardTitle>Cadastro de Barbearia</CardTitle>
        <CardDescription>Preencha os dados da sua barbearia</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input id="cnpj" name="cnpj" value={formData.cnpj} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cep">CEP</Label>
              <Input id="cep" name="cep" value={formData.cep} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="number">Número</Label>
              <Input id="number" name="number" type="number" value={formData.number} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bairro">Bairro</Label>
              <Input id="bairro" name="bairro" value={formData.bairro} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cidade">Cidade</Label>
              <Input id="cidade" name="cidade" value={formData.cidade} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estado">Estado</Label>
              <Input id="estado" name="estado" value={formData.estado} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" name="telefone" value={formData.telefone} onChange={handleInputChange} required />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Horário de Funcionamento</h3>
            {daysOfWeek.map(day => (
              <div key={day} className="grid grid-cols-3 gap-4 items-center">
                <Label>{day}</Label>
                <div className="space-y-2">
                  <Label htmlFor={`${day}-start`}>Abertura</Label>
                  <Select
                    value={formData.hours[day].start}
                    onValueChange={(value) => handleTimeChange(day, 'start', value)}
                  >
                    <SelectTrigger id={`${day}-start`} >
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map(time => (
                        <SelectItem key={`${day}-start-${time}`} value={time} className='bg-white'>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${day}-end`}>Fechamento</Label>
                  <Select
                    value={formData.hours[day].end}
                    onValueChange={(value) => handleTimeChange(day, 'end', value)}
                  >
                    <SelectTrigger id={`${day}-end`}>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map(time => (
                        <SelectItem key={`${day}-end-${time}`} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>

          <Button type="submit" className="w-full">Cadastrar Barbearia</Button>
        </form>
      </CardContent>
    </Card>
  )
}
