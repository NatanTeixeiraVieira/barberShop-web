import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import BarberShopHours from '@/components/barberShopHours/barberShopHours'
import FormBarberShop from '@/components/formBarberShop/formBarberShop'

export default function CadastroBarbearia() {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // lógica do submit
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white min-h-screen flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Cadastro de Barbearia</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormBarberShop />
          <BarberShopHours />
        </form>
      </CardContent>
      <div className="p-4">
        <Button type="submit" className="w-full">Cadastrar Barbearia</Button>
      </div>
    </Card>
  )
}
