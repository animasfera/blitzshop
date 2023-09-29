import { resolver } from "@blitzjs/rpc"
import db, { Cart, CartToItem } from "db"
import { z } from "zod"

const GetCart = z.object({
  // This accepts type of undefined, but is required at runtime
  userId: z.number().optional(),
  sessionId: z.string().optional(),
})

export default resolver.pipe(resolver.zod(GetCart), async ({ userId, sessionId }, ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  let cart: (Cart & { cartToItems: CartToItem[] }) | null

  if (userId) {
    cart = await db.cart.findFirst({
      where: { userId },
      include: { cartToItems: true, amount: true },
    })
  } else if (sessionId || ctx.session.$handle) {
    cart = await db.cart.findFirst({
      where: { sessionId: sessionId ?? ctx.session.$handle },
      include: { cartToItems: true, amount: true },
    })
  } else {
    throw new Error("Please provide either sessionId or userId to get a cart")
  }

  if (!cart) return null

  return cart
})
