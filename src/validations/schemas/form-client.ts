import { z } from 'zod';

export const formClientSchema = z
  .object({
    name: z
      .string()
      .min(1, 'o nome é obrigatório')
      .refine((value) => /\S/.test(value), 'Nome não pode ser apenas espaços'),
    email: z
      .string()
      .email('O email deve ser example@email.com')
      .refine((value) => /\S/.test(value), 'Email não pode ser apenas espaços'),
    password: z
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .refine((value) => /\S/.test(value), 'Senha não pode ser apenas espaços')
    .refine(
      (value) => /[A-Z]/.test(value),
      'A senha deve conter pelo menos uma letra maiúscula'
    )
    .refine(
      (value) => /\d/.test(value),
      'A senha deve conter pelo menos um número'
    )
    .refine(
      (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
      'A senha deve conter pelo menos um caractere especial'
    ),
    confirmPassword: z
      .string()
      .min(1, 'a senha é obrigatória')
      .refine((value) => /\S/.test(value), 'Senha não pode ser apenas espaços')
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        message: 'As senhas não coincidem',
        code: z.ZodIssueCode.custom,
      });
    }
  });
