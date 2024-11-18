import {
  Client,
  CreateClientDto,
  UpdateClientProfileDto,
} from '@/types/client';
import { api } from './api';

export const getLoggedClient = async () => {
  const address = await api.get<Client>(`/client/v1/client-id`);

  return address;
};

export const createClient = async (dto: CreateClientDto) => {
  const client = await api.post<Client>('/client/v1', dto);

  return client;
};

export const updateClientProfile = async ({
  name,
  phoneNumber,
  fileList,
}: UpdateClientProfileDto) => {
  console.log('🚀 ~ phoneNumber:', phoneNumber);
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

  const updatedClient = await api.put<Client>(`/client/v1`, body);

  return updatedClient;
};

export const deleteClient = async () => {
  await api.delete<void>(`/client/v1`);
};
