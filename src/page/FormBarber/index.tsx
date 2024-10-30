import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormBarberShop from '@/components/formBarberShop/formBarberShop';
import { useBarberShopContext } from '@/context/formBarberShopContext';

export default function CadastroBarbearia() {

  const { formBarberShop } = useBarberShopContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const BarberShopData = {
      ...formBarberShop,
    };


    try {
      const response = await fetch('http://localhost:3333/api/barber-shop/v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(BarberShopData),
      });

      if (response.ok) {
        console.log("Barbearia cadastrada com sucesso!");
      } else {
        console.error("Erro ao cadastrar barbearia");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <Card className="my-6 w-full max-w-3xl mx-auto bg-white min-h-screen flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Cadastro de Barbearia</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormBarberShop />
          <div className="p-4">
            <Button type="submit" className="w-full">Cadastrar Barbearia</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
