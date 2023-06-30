import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdatePurchasedItemSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdatePurchasedItemSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const purchasedItem = await db.purchasedItem.update({
      where: { id },
      data,
    })

    return purchasedItem
  }
)
