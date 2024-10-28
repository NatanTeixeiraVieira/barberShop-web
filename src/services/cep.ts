import { cepApi } from './api';
import { Cep } from '@/types/cep';

export const getAddressByCepNumber = async (cep: string | number) => {
  const address = await cepApi.get<Cep>(`/api/cep/v1/${cep}`);

  return address;
};
