import { Ctx } from "@blitzjs/next"
import { resolver } from "@blitzjs/rpc"
import db, { CurrencyEnum, Price } from "db"
import { CartWithCartToItem } from "types"

import { MergedCart } from "src/carts/schemas"
import { converter } from "src/core/converter"
import { z } from "zod"
import getCart from "../queries/getCart"

export default resolver.pipe(
  resolver.zod(
    z.object({
      mergeToCartId: z.number(),
      mergeFromCartId: z.number(),
    })
  ),
  resolver.authorize(),
  async ({ mergeToCartId, mergeFromCartId }, ctx: Ctx) => {
    // get unlogged cart
    const currentCart = await getCart({}, ctx)

    // move items from unlogged to logged
    await db.cartToItem.updateMany({
      where: {
        cartId: mergeFromCartId,
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
    await db.cart.delete({ where: { id: mergeFromCartId } })

    return await getCart({}, ctx)
  }
)
