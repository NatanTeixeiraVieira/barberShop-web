import { ReturnLoginCLientDto } from '@/types/login';

export const authenticate = (login: ReturnLoginCLientDto) => {
  localStorage.setItem('login', JSON.stringify(login));
};

export const logout = () => {
  localStorage.removeItem('login');
};

export const getAuth = () => {
  const login = localStorage.getItem('login');
  if (login) {
    const auth: ReturnLoginCLientDto = JSON.parse(login);
    return auth;
  }

  return null;
};

