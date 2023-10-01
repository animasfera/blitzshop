import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteCartToItemSchema } from "../schemas"

export default resolver.pipe(resolver.zod(DeleteCartToItemSchema), async ({ id }, ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const cartToItem = await db.cartToItem.delete({ where: { id } })

  return cartToItem
})
