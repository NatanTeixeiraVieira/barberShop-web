import { verifyLoginSchema } from "@/validations/schemas/login"
import { z } from "zod"

export type VerifyLogin = {
  email: string,
  password: string,
}

export type VerifiLoginData = z.infer<typeof verifyLoginSchema>
