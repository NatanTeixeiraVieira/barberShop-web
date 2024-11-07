import React, { useState, useEffect } from 'react';

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  barberShopId: string;
}

const BarberShopDetails: React.FC = () => {
  const [barberShopServices, setBarberShopServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const barberShopId = 'b4bbeff7-77db-4284-97e3-7faddec81b9b';

  useEffect(() => {
    async function fetchBarberShop() {
      try {
        // Simulação de fetch
        const response = await fetch(
          `http://localhost:3333/api/barber-service/v1/barber-shop/${barberShopId}`,
        );
        const data = await response.json();
        setBarberShopServices(data);
      } catch (error) {
        console.error('Erro ao buscar os serviços do barbeiro:', error);
        setBarberShopServices([]); // Define um array vazio no caso de erro
      } finally {
        setIsLoading(false); // Indica que o carregamento terminou
      }
    }

    fetchBarberShop();
  }, []);

  // Verificação adicional para garantir que o array não seja undefined
  const hasServices =
    Array.isArray(barberShopServices) && barberShopServices.length > 0;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-8">
      <div className="flex justify-between items-center mb-4">
        <button className="text-gray-500 hover:text-gray-700">
          {/* Voltar para a lista de barbeiros */}
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-2xl font-bold">Nome do Barbeiro</h1>

        <div className="flex items-center mb-4">
          <span className="text-yellow-500 text-lg">★★★★☆</span>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-2">Lista de serviços</h2>

      {isLoading ? (
        <p className="text-gray-600">Carregando serviços...</p>
      ) : hasServices ? (
        barberShopServices.map((service) => (
          <div
            key={service.id}
            className="flex justify-between items-center mb-4"
          >
            <div>
              <p className="font-medium">{service.name}</p>
              <p className="text-sm text-gray-600">R$ {service.price}</p>
              <p className="text-sm text-gray-600">
                Duração: {service.duration} min
              </p>
            </div>
            <button className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 transition-colors">
              Agendar
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-600">Nenhum serviço encontrado.</p>
      )}
    </div>
  );
};

export default BarberShopDetails;
