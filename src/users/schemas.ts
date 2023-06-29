import { z } from "zod"
import { UserModel } from "db/zod"

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
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteUserSchema = z.object({
  id: z.number(),
})
