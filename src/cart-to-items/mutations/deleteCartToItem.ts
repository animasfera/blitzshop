import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteCartToItemSchema } from "../schemas"
import getCart from "../../carts/queries/getCart"
import { AuthorizationError, NotFoundError } from "blitz"

export default resolver.pipe(resolver.zod(DeleteCartToItemSchema), async ({ id }, ctx) => {
  const cart = await getCart({}, ctx)
  const cartToItem = await db.cartToItem.findUnique({
    where: { id },
  })
  if (!cartToItem) {
    throw new NotFoundError()
  }
  if (cartToItem.cartId !== cart.id) {
    throw new AuthorizationError()
  }

  return await db.cartToItem.delete({ where: { id } })
})
