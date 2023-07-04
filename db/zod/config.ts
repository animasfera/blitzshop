import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const ConfigModel = z.object({
  key: z.string(),
  value: z.string().nullish(),
})

export interface CompleteConfig extends z.infer<typeof ConfigModel> {
  user: CompleteUser[]
}

/**
 * RelatedConfigModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedConfigModel: z.ZodSchema<CompleteConfig> = z.lazy(() => ConfigModel.extend({
  user: RelatedUserModel.array(),
}))
