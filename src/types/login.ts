import { verifyLoginSchema } from '@/validations/schemas/login';
import { z } from 'zod';
import { Client } from './client';

export type ReturnLoginCLientDto = {
  client: Client;
  token: string;
};

export type VerifyLogin = {
  email: string;
  password: string;
};

export type VerifyLoginData = z.infer<typeof verifyLoginSchema>;
