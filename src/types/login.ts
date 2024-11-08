import { verifyLoginSchema } from "@/validations/schemas/login"
import { z } from "zod"

export type ReturnLoginCLientDto = {
  id: string;
  name: string;
  email:string;
  phoneNumber: string;
  photoUrl: string;
  token: string;
}

export type VerifyLogin = {
  email: string,
  password: string,
}

export type VerifiLoginData = z.infer<typeof verifyLoginSchema>
