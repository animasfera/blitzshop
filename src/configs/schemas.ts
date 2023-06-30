import { z } from "zod"
import { ConfigModel } from "db/zod"

export const CreateConfigSchema = ConfigModel.pick({
  key: true,
  value: true,
})

export const UpdateConfigSchema = z.object({
  key: z.string(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteConfigSchema = z.object({
  key: z.string(),
})
