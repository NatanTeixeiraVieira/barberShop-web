import { z } from "zod";

export const formClientSchema = z.object({
  name: z.string().min(1,"o nome é obrigatório"),
  email: z.string().email('O email deve ser example@email.com'),
  password: z.string().min(1, "a senha é obrigatória")
})
