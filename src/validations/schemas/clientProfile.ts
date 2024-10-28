import { z } from 'zod';
import { commonRequiredField } from './utils';

export const clientProfileSchema = z.object({
  name: commonRequiredField('O nome é obrigatório.'),
  phoneNumber: commonRequiredField('O número de telefone é obrigatório.'),
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
