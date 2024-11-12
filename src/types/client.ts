import { clientProfileSchema } from '@/validations/schemas/clientProfile';
import { formClientSchema } from '@/validations/schemas/form-client';
import { z } from 'zod';

export type Client = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  photoUrl: string;
};

export type ClientRegisterData = z.infer<typeof formClientSchema>;

export type CreateClientDto = {
  name: string;
  email: string;
  password: string;
};

export type ClientProfileFormData = z.infer<typeof clientProfileSchema>;

export type UpdateClientProfileDto = {
  name?: string;
  phoneNumber?: string;
  fileList?: FileList;
};
