import { z } from 'zod';
import { commonRequiredField } from './utils';

export const barberShopProfileSchema = z.object({
  name: commonRequiredField('O nome é obrigatório.').refine(
    (value) => /\S/.test(value),
    'Nome não pode ser apenas espaços',
  ),
  cnpj: commonRequiredField('O CNPJ é obrigatório.').regex(
    /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
    'CNPJ inválido',
  ),
  cep: commonRequiredField('O CEP é obrigatório.').regex(
    /^\d{5}-?\d{3}$/,
    'CEP inválido',
  ),
  number: commonRequiredField('O número é obrigatório.'),
  neighborhood: commonRequiredField('O bairro é obrigatório.'),
  city: commonRequiredField('A cidade é obrigatório.'),
  state: commonRequiredField('O Estado é obrigatório.').refine(
    (value) => /\S/.test(value),
    'Estado não pode ser apenas espaços',
  ),
  phone: commonRequiredField('O número de telefone é obrigatório.')
    .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, 'Telefone deve ser do tipo (xx) xxxxx-xxxx')
    .refine(
      (value) => /^\d+$/.test(value.replace(/\D/g, '')),
      'Telefone deve conter apenas números',
    ),
  street: commonRequiredField('A rua é obrigatória.').refine(
    (value) => /\S/.test(value),
    'Rua não pode ser apenas espaços',
  ),
  file: z
    .custom<FileList>((value) => {
      return value instanceof FileList;
    })
    .refine((files) => !files[0] || files[0]?.size <= 5 * 1024 * 1024, {
      // Max 5 MB
      message: 'A foto precisa ter menos que 5 MB',
    })
    .refine(
      (files) =>
        !files[0] ||
        ['image/jpeg', 'image/png'].includes(files ? files[0]?.type : ''),
      {
        message: 'Somente arquivos JPG e PNG são permitidos',
      },
    ),
});
