import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeletePurchasedItemSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeletePurchasedItemSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const purchasedItem = await db.purchasedItem.deleteMany({ where: { id } })

    return purchasedItem
  }
)
