import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateCartSchema } from "../schemas"
import { CurrencyEnum, Prisma } from "@prisma/client"

export default resolver.pipe(
  resolver.zod(CreateCartSchema),
  // resolver.authorize(),
  async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    // const defaultCart = {{numItems: 0},}

    const privateSessData = await ctx.session.$getPrivateData()
    if (ctx.session.$isAuthorized() || privateSessData.cartId) {
      throw new Error("Cart already exists")
    }

    let data = {
      amount: {
        create: {
          amount: 0,
          currency: CurrencyEnum.RUB,
        },
      },
    } as Prisma.CartCreateInput
    if (input.userId) {
      data.user = {
        connect: { id: input.userId },
      }
    }
    const cart = await db.cart.create({ data })
    ctx.session.$setPrivateData({
      cartId: cart.id,
    })

    return cart
  }
)
