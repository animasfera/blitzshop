import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"

export default resolver.pipe(resolver.authorize(), async ({}, ctx) => {
  const session = await ctx.session.$getPrivateData()
  const cartId = session.cartId

  if (!cartId) throw new NotFoundError(`Cart with ID: ${cartId} not found`)

  // clean cart
  await db.cartToItem.deleteMany({ where: { cartId } })
  await db.cart.update({
    where: { id: cartId },
    data: { numItems: 0 },
  })
})
