import { verifyLoginSchema } from '@/validations/schemas/login';
import { z } from 'zod';
import { ClientLogin } from './client';

export type ReturnLoginCLientDto = {
  client: ClientLogin;
};

export type VerifyLogin = {
  email: string;
  password: string;
};

export type VerifyLoginData = z.infer<typeof verifyLoginSchema>;
