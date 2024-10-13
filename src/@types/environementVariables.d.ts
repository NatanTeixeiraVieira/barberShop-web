import { EnvironmentVariables } from '@/types/environementVariables';

export {};

declare global {
  namespace NodeJS {
    type ProcessEnv = EnvironmentVariables;
  }
}
