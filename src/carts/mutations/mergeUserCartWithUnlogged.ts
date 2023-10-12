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
      unloggedCartId: z.number(),
    })
  ),
  resolver.authorize(),
  async ({ unloggedCartId }, ctx: Ctx) => {
    // get unlogged cart
    const currentCart = await getCart({}, ctx)

    // move items from unlogged to logged
    await db.cartToItem.updateMany({
      where: {
        cartId: unloggedCartId,
      },
      data: {
        cartId: currentCart.id,
      },
    })

    // update cart item counter
    const numItems = await db.cartToItem.count({
      where: {
        cartId: currentCart.id,
      },
    })
    await db.cart.update({
      where: { id: currentCart.id },
      data: {
        numItems,
      },
    })

    // delete unlogged cart
    await db.cart.delete({ where: { id: unloggedCartId } })

    return await getCart({}, ctx)
  }
)
