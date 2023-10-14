import { resolver } from "@blitzjs/rpc"
import db, { Cart, CartToItem, Image, ImageToItem, Item, Price } from "db"
import { z } from "zod"
import { NotFoundError } from "blitz"
import createCart from "../mutations/createCart"

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
  let cart:
    | (Cart & {
        amount: Price
        cartToItems: (CartToItem & {
          item: Item & { amount: Price; coverImage: ImageToItem & { image: Image } }
        })[]
      })
    | null = null
  if (input.userId || input.id) {
    cart = await db.cart.findFirst({
      where: input,
      include: {
        cartToItems: {
          include: {
            item: { include: { amount: true, coverImage: { include: { image: true } } } },
          },
          take: 250,
        },
        amount: true,
      },
    })
  }

  if (!cart) {
    const newCartArgs = input.userId ? { userId: input.userId } : {}
    cart = await createCart(newCartArgs, ctx)
  }

  return cart
})
