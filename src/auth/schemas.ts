import { z } from "zod"

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string()
  .min(8)
  .max(100)
  .transform((str) => str.trim())

export const Signup = z.object({
  username: z.string(),
  email,
  password,
  timezone: z.string().optional(),
  countryIsoCode: z.string(),
  locale: z.string(),
})

export const Login = z.object({
  email,
  password: z.string(),
  timezone: z.string().optional(),
})

export const ForgotPassword = z.object({
  email,
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})

export const ConfirmEmail = z.object({
  token: z.string(),
})
