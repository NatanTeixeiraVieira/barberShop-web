import FormBarberShop from "@/components/form-barber-shop";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterBarberShop() {

  return (
    <Card className="my-6 w-full max-w-3xl mx-auto bg-white min-h-screen flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Cadastro de Barbearia</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <FormBarberShop />
      </CardContent>
    </Card>
  );
}
