import { z } from 'zod';
import { commonRequiredField } from './utils';

export const barberShopProfileSchema = z.object({
  name: commonRequiredField('O nome é obrigatório.'),
  cnpj: commonRequiredField('O CNPJ é obrigatório.'),
  cep: commonRequiredField('O CEP é obrigatório.'),
  number: commonRequiredField('O número é obrigatório.'),
  neighborhood: commonRequiredField('O bairro é obrigatório.'),
  city: commonRequiredField('A cidade é obrigatório.'),
  state: commonRequiredField('O Estado é obrigatório.'),
  phone: commonRequiredField('O número de telefone é obrigatório.'),
  street: commonRequiredField('A rua é obrigatória.'),
  file: z
    .custom<FileList>((value) => {
      console.log('🚀 ~ value:', value);
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
