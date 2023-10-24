import { z } from "zod"
import { ConfigModel } from "db/zod"

export const CreateConfigSchema = ConfigModel.pick({
  key: true,
  value: true,
})

export const UpdateConfigSchema = ConfigModel.pick({
  key: true,
  value: true,
})

export const DeleteConfigSchema = z.object({
  key: z.string(),
})
