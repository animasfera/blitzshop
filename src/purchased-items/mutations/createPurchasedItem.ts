import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreatePurchasedItemSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreatePurchasedItemSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const purchasedItem = await db.purchasedItem.create({ data: input })

    return purchasedItem
  }
)
