import { clientProfileSchema } from '@/validations/schemas/clientProfile';
import { z } from 'zod';

export type Client = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  photoUrl: string;
};

export type ClientProfileFormData = z.infer<typeof clientProfileSchema>;

export type UpdateClientProfileDto = {
  id: string;
  name?: string;
  phoneNumber?: string;
  fileList?: FileList;
};
