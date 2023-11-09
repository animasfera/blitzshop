import { resolver } from "@blitzjs/rpc"
import db, { Cart, CartToItem, Image, ImageToItem, Item } from "db"
import { z } from "zod"
import createCart from "../mutations/createCart"
import { CartItemWithItem, CartWithCartToItem } from "../../../types"

const GetCart = z.object({
  id: z.number().optional(),
  userId: z.number().optional(),
})

export default resolver.pipe(resolver.zod(GetCart), async (input, ctx) => {
  if (!input.userId && !input.id) {
    const sessPriv = await ctx.session.$getPrivateData()
    input = {
      id: sessPriv.cartId,
    }
  }
  let cart: CartWithCartToItem | null = null
  if (input.userId || input.id) {
    cart = await db.cart.findFirst({
      where: input,
      include: {
        cartToItems: {
          include: {
            item: {
              include: {
                images: {
                  take: 1,
                  include: { image: true },
                },
              },
            },
          },
          take: 250,
        },
      },
    })
  }

  if (!cart) {
    const newCartArgs = input.userId ? { userId: input.userId } : {}
    cart = await createCart(newCartArgs, ctx)
  }

  return cart
})
