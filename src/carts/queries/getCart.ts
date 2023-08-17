import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetCart = z.object({
  // This accepts type of undefined, but is required at runtime
  userId: z.number().optional(),
  sessionId: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(GetCart),
  resolver.authorize(),
  async ({ userId, sessionId }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    let cart
    if (userId) {
      cart = await db.cart.findFirst({ where: { userId } })
    } else if (sessionId) {
      cart = await db.cart.findFirst({ where: { sessionId } })
    } else {
      throw new Error("Please provide either sessionId or userId to get a cart")
    }

    if (!cart) return {}

    return cart
  }
)
