import { z } from 'zod';

export const formBarberShopSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres')
  .refine(value => /\S/.test(value), 'Nome não pode ser apenas espaços'),
  cnpj: z
    .string()
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido'),
  cep: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP inválido'),
  state: z.string().min(2, 'Selecione um estado'),
  street: z.string().min(3, 'Rua deve ter pelo menos 3 caracteres')
  .refine(value => /\S/.test(value), 'Rua não pode ser apenas espaços'),
  number: z.string().regex(/^\d+$/, 'Número deve conter apenas dígitos')
  .refine(value => /\S/.test(value), 'Número não pode ser apenas espaços'),
  neighborhood: z.string().min(3, 'Bairro deve ter pelo menos 3 caracteres')
  .refine(value => /\S/.test(value), 'Bairro não pode ser apenas espaços'),
  city: z.string().min(3, 'Cidade deve ter pelo menos 3 caracteres')
  .refine(value => /\S/.test(value), 'Cidade não pode ser apenas espaços'),
  phone: z
    .string()
    .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, 'Telefone inválido')
    .refine(
      (value) => /^\d+$/.test(value.replace(/\D/g, '')),
      'Telefone deve conter apenas números',
    ),
});
