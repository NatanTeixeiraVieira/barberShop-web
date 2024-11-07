import { VerifyLogin } from "@/types/login";
import { api } from "./api";

export const verifyLogin = async (dto: VerifyLogin) => {
  const login = await api.post<VerifyLogin>('/auth/v1/login', dto);

  return login;
}
