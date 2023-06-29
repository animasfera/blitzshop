import * as z from "zod"
import { CurrencyEnum } from "@prisma/client"
import { CompleteItem, RelatedItemModel } from "./index"

export const PriceModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  amount: z.number().int(),
  currency: z.nativeEnum(CurrencyEnum),
})

export interface CompletePrice extends z.infer<typeof PriceModel> {
  items: CompleteItem[]
}

/**
 * RelatedPriceModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPriceModel: z.ZodSchema<CompletePrice> = z.lazy(() =>
  PriceModel.extend({
    items: RelatedItemModel.array(),
  })
)
