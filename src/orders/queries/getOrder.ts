import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetOrder = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetOrder), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const order = await db.order.findFirst({
    where: { id },
    include: {
      log: {
        where: { comment: null },
        orderBy: { createdAt: "desc" },
      },
      invoice: true,
      shippingAddress: {
        include: { country: true },
      },
      user: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          avatarUrl: true,
        },
      },
      items: {
        include: {
          category: true,
          coverImage: true,
          item: {
            include: { user: { select: { email: true, id: true, username: true } } },
          },
        },
      },
    },
  })

  if (!order) throw new NotFoundError()

  return order
})
