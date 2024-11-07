import { z } from "zod";

export const createBarberShopSchema = z.object({
  days: z.object({
    Segunda: z.object({
      start: z.string().min(1, 'O horário de inicio é obrigatorio'),
      end: z.string().min(1, 'O horário final é obrigatorio'),
    }),
    Terça: z.object({
      start: z.string().min(1, 'O horário de inicio é obrigatorio'),
      end: z.string().min(1, 'O horário final é obrigatorio'),
    }),
    Quarta: z.object({
      start: z.string().min(1, 'O horário de inicio é obrigatorio'),
      end: z.string().min(1, 'O horário final é obrigatorio'),
    }),
    Quinta: z.object({
      start: z.string().min(1, 'O horário de inicio é obrigatorio'),
      end: z.string().min(1, 'O horário final é obrigatorio'),
    }),
    Sexta: z.object({
      start: z.string().min(1, 'O horário de inicio é obrigatorio'),
      end: z.string().min(1, 'O horário final é obrigatorio'),
    }),
    Sabado: z.object({
      start: z.string().min(1, 'O horário de inicio é obrigatorio'),
      end: z.string().min(1, 'O horário final é obrigatorio'),
    }),
    Domingo: z.object({
      start: z.string().min(1, 'O horário de inicio é obrigatorio'),
      end: z.string().min(1, 'O horário final é obrigatorio'),
    })
  })
});
