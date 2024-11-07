import { BarberShopDetails } from '@/types/barberShopDetails';
import { api } from './api';

export const getBarberShopDetails = async (id: string) => {
  try {
    // Faz a requisição para a URL especificada no useEffect
    const response = await api.get<BarberShopDetails[]>(
      `/barber-service/v1/barber-shop/${id}`,
    );

    // Retorna os dados da resposta
    return response.data;
  } catch (error) {
    // Tratamento de erro
    console.error('Erro ao buscar os serviços da barbearia:', error);
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};
