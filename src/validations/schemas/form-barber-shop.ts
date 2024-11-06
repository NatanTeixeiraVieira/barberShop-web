import { z } from "zod";

export const formBarberShopSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  cnpj: z.string().regex(/^\d{14}$/, "CNPJ inválido"),
  state: z.string().min(2, "Selecione um estado"),
  cep: z.string().regex(/^\d{5}-?\d{3}$/, "Cep inválido"),
  street: z.string().min(3, "Rua deve ter pelo menos 3 caracteres"),
  number: z.string().min(1, "Número é obrigatório"),
  neighborhood: z.string().min(3, "Bairro deve ter pelo menos 3 caracteres"),
  city: z.string().min(3, "Cidade deve ter pelo menos 3 caracteres"),
  phone: z.string().regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Telefone inválido"),
})
