import { z } from 'zod';

export const commonRequiredField = (errorMessage: string) =>
  z.string({ required_error: errorMessage }).min(1, { message: errorMessage });
