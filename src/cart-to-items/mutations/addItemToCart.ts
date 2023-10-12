import { resolver } from "@blitzjs/rpc"
import db from "db"
import { AddProductToCartSchema } from "../schemas"
import createCart from "../../carts/mutations/createCart"
import { NotFoundError } from "blitz"

export default resolver.pipe(resolver.zod(AddProductToCartSchema), async ({ itemId }, ctx) => {
  const privateSessData = await ctx.session.$getPrivateData()
  let cartId = privateSessData.cartId
  if (!ctx.session.$isAuthorized() && !cartId) {
    const cart = await createCart({}, ctx)
    cartId = cart.id
  }

  let numCartToItems = await db.cartToItem.count({
    where: { cartId: cartId },
  })
  if (numCartToItems > 249) {
    throw new Error("You have reach the maximum number of items in the cart: 250.")
  }

  const item = await db.item.findUnique({
    where: {
      id: itemId,
    },
    select: {
      id: true,
      qty: true,
      amount: true,
    },
  })

  if (!item) {
    throw new NotFoundError("Item not found")
  }

  await db.cartToItem.upsert({
    where: { cartId_itemId: { itemId, cartId: cartId } },
    create: {
      item: {
        connect: { id: item.id },
      },
      cart: { connect: { id: cartId } },
    },
    update: {
      qty: { increment: 1 },
    },
    include: { item: { include: { amount: true } }, cart: { include: { amount: true } } },
  })

  numCartToItems = await db.cartToItem.count({
    where: { cartId: cartId },
  })

  const cartUpdated = await db.cart.update({
    where: { id: cartId },
    data: { numItems: numCartToItems },
  })

  return cartUpdated
})
