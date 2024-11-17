import { ReturnLoginCLientDto } from '@/types/login';

export const authenticate = (login: ReturnLoginCLientDto) => {
  localStorage.setItem('client', JSON.stringify(login));
};

export const logout = () => {
  localStorage.removeItem('client');
};

export const getAuth = () => {
  const login = localStorage.getItem('client');
  if (login) {
    const auth: ReturnLoginCLientDto = JSON.parse(login);
    return auth;
  }

  return null;
};
