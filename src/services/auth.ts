import { ReturnLoginCLientDto, VerifyLogin } from '@/types/login';
import { api } from './api';
import { authenticate, logout as logoutUser } from '@/utils/auth';

export const login = async (dto: VerifyLogin) => {
  const login = await api.post<ReturnLoginCLientDto>('/auth/v1/login', dto);

  authenticate(login.data);
  return login;
};

export const logout = async () => {
  await api.post<void>('/auth/v1/logout');
  logoutUser();
};
