import { z } from 'zod';
import { regexEmail } from '../regex';

export const verifyLoginSchema = z.object({
  email: z
    .string()
    .email('O email deve ser example@email.com')
    .regex(regexEmail, 'O email deve ser example@email.com'),
  password: z
    .string()
    .min(1, 'a senha é obrigatória')
    .refine((value) => /\S/.test(value), 'Senha não pode ser apenas espaços'),
});
