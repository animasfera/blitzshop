import { z } from "zod"
import { CurrencyEnum, CountryFilterEnum } from "@prisma/client"
import { UserModel, LocationModel } from "db/zod"

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const username = z
  .string()
  .transform((str) => str.toLowerCase().trim())
  .refine((username) => !/[^0-9a-z_]/.test(username), {
    message:
      "В имени пользователя допустимы только буквы латинского алфавита (a-z), цифры (0-9) и знак нижнего подчеркивания (_)",
  })

export const firstName = z.string().transform((str) => str.trim())

export const lastName = z.string().transform((str) => str.trim())

const telegram = z
  .string()
  .transform((str) => str.toLowerCase().trim().replace(/@/g, ""))
  .refine((username) => !/[^0-9a-z_\.]/.test(username), {
    message:
      "В Telegram username допустимы только буквы латинского алфавита (a-z), цифры (0-9), знак нижнего подчеркивания (_) и точка (.)",
  })

export const CreateUserSchema = UserModel.pick({
  username: true,
  email: true,
  countryIsoCode: true,
  phone: true,
  firstName: true,
  lastName: true,
  role: true,
  timezone: true,
  locale: true,
  status: true,
  buyingInCountries: true,
  currency: true,
})

export const UpdateUserSchema = z.object({
  id: z.number(),
  email: email.optional(),
  firstName: firstName.nullable().optional(),
  lastName: lastName.nullable().optional(),

  // template: __fieldName__: z.__zodType__(),
})

export const DeleteUserSchema = z.object({
  id: z.number(),
})

export const UpdateUserAdminSchema = z.object({
  id: z.number(),
  email: email.optional(),
  emailLeelaCertificate: email.optional().nullable(),
  phone: z.string().optional().nullable(),
  telegram: telegram.optional().nullable(),
  share_email: z.boolean().optional(),
  share_phone: z.boolean().optional(),
  share_telegram: z.boolean().optional(),
  username: username.optional(),
  about: z.string().optional().nullable(),
  avatarUrl: z.string().nullable().optional(),
  timezone: z.string().nullable().optional(),
  locale: z.string().nullable().optional(),
  firstName: firstName.nullable().optional(),
  lastName: lastName.nullable().optional(),
  location: LocationModel.optional().nullable(),
  // passportImgUrl: z.string().optional().nullable(),
  // selfieImgUrl: z.string().optional().nullable(),
  idStatus: z.enum(["inactive", "checking", "approved", "rejected"]).optional(),
  idFailReason: z.string().optional().nullable(),
  paymentMethodDetailId: z.number().optional().nullable(),
  buyingInCountries: z.nativeEnum(CountryFilterEnum).optional(),
  sellingInCountries: z.nativeEnum(CountryFilterEnum).optional(),
  currency: z.nativeEnum(CurrencyEnum).optional(),
  isGuide: z.boolean().optional(),
  status: z.string().optional(),
  blockReason: z.string().optional(),
})
