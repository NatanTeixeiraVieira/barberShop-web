import { z } from "zod";

export const verifyLoginSchema = z.object({
  email: z.string().email('O email deve ser example@email.com'),
  password: z.string().min(1, 'a senha é obrigatória')
})
