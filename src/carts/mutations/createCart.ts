import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateCartSchema } from "../schemas"
import { Prisma } from "@prisma/client"

export default resolver.pipe(
  resolver.zod(CreateCartSchema),
  // resolver.authorize(),
  async ({ userId }, ctx) => {
    const privateSessData = await ctx.session.$getPrivateData()

    const existingCart = await db.cart.findMany({
      where: {
        userId,
      },
    })
    if (
      existingCart[0] &&
      privateSessData.cartId &&
      privateSessData.cartId === existingCart[0].id
    ) {
      throw new Error("Cart already exists")
    }

    let data = {} as Prisma.CartCreateInput
    if (userId) {
      data.user = {
        connect: { id: userId },
      }
    }
    const cart = await db.cart.create({
      data,
      include: {
        cartToItems: {
          include: {
            item: { include: { images: { take: 1, include: { image: true } } } },
          },
        },
      },
    })
    ctx.session.$setPrivateData({
      cartId: cart.id,
    })

    return cart
  }
)
