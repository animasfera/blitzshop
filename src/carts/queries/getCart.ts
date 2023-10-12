import { resolver } from "@blitzjs/rpc"
import db, { Cart, CartToItem, Image, ImageToItem, Item, Price } from "db"
import { z } from "zod"
import createCart from "../mutations/createCart"
import { NotFoundError } from "blitz"

const GetCart = z.object({})

export default resolver.pipe(resolver.zod(GetCart), async ({}, ctx) => {
  const privateSessData = await ctx.session.$getPrivateData()
  let cartId = privateSessData.cartId
  if (!ctx.session.$isAuthorized() && !cartId) {
    const cart = await createCart({}, ctx)
    cartId = cart.id
  }

  const cart = await db.cart.findUnique({
    where: { id: cartId },
    include: {
      cartToItems: {
        include: {
          item: { include: { amount: true, coverImage: { include: { image: true } } } },
        },
      },
      amount: true,
    },
  })

  if (!cart) {
    throw new NotFoundError("Can't load user cart")
  }

  return cart
})
