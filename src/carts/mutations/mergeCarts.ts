import { Ctx } from "@blitzjs/next"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

import getCart from "src/carts/queries/getCart"

export default resolver.pipe(
  resolver.zod(
    z.object({
      mergeToCartId: z.number(),
      mergeFromCartId: z.number(),
    })
  ),
  async ({ mergeToCartId, mergeFromCartId }, ctx: Ctx) => {
    // get unlogged cart
    const currentCart = await getCart({}, ctx)
    const moveToCart = await getCart({ id: mergeToCartId }, ctx)
    const noRepeatItems = currentCart.cartToItems.filter((item) => {
      const itemExists = moveToCart?.cartToItems.find((item) => item.id === item.id)
      return !itemExists
    })

    // move items from unlogged to logged
    await db.cartToItem.updateMany({
      where: {
        id: { in: noRepeatItems.map((item) => item.id) },
      },
      data: {
        cartId: mergeToCartId,
      },
    })

    // update cart item counter
    const numItems = await db.cartToItem.count({
      where: {
        cartId: mergeToCartId,
      },
    })
    await db.cart.update({
      where: { id: mergeToCartId },
      data: {
        numItems,
      },
    })

    // delete unlogged cart
    await db.cartToItem.deleteMany({ where: { cartId: mergeFromCartId } })
    await db.cart.delete({ where: { id: mergeFromCartId } })

    return await getCart({}, ctx)
  }
)
