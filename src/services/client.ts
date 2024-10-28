import { Client, UpdateClientProfileDto } from '@/types/client';
import { api } from './api';

export const getClientById = async (clientId: string) => {
  const address = await api.get<Client>(`/client/v1/${clientId}`);

  return address;
};

export const updateClientProfile = async ({
  id,
  name,
  phoneNumber,
  fileList,
}: UpdateClientProfileDto) => {
  const body = new FormData();

  const dto: Omit<UpdateClientProfileDto, 'id' | 'fileList'> = {
    name,
    phoneNumber,
  };

  console.log('🚀 ~ fileList:', fileList);
  if (fileList) {
    body.append('file', fileList[0]);
  }

  body.append('dto', JSON.stringify(dto));
  console.log('🚀 ~ body:', body);

  const updatedClient = await api.put<Client>(`/client/v1/${id}`, body);

  return updatedClient;
};
