import { z } from "zod";

export const formBarberShopSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  cnpj: z.string()
    .regex(/^\d{14}$/, "CNPJ inválido")
    .refine((value) => /^\d+$/.test(value), "CNPJ deve conter apenas números"),
  state: z.string().min(2, "Selecione um estado"),
  cep: z.string()
    .regex(/^\d{5}-?\d{3}$/, "CEP inválido"),
  street: z.string().min(3, "Rua deve ter pelo menos 3 caracteres"),
  number: z.string()
    .regex(/^\d+$/, "Número deve conter apenas dígitos"),
  neighborhood: z.string().min(3, "Bairro deve ter pelo menos 3 caracteres"),
  city: z.string().min(3, "Cidade deve ter pelo menos 3 caracteres"),
  phone: z.string()
    .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Telefone inválido")
    .refine((value) => /^\d+$/.test(value.replace(/\D/g, '')), "Telefone deve conter apenas números"),
});
