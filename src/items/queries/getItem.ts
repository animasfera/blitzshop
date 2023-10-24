import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { UserRoleEnum } from "db"
import { z } from "zod"

const GetItem = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetItem),
  // resolver.authorize(),
  async ({ id }, ctx) => {
    const isAdmin = ctx.session.$isAuthorized(UserRoleEnum.ADMIN)
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const item = await db.item.findFirst({
      where: { id },
      include: {
        _count: true,
        amount: true,
        category: true,
        coverImage: { include: { image: true } },
        images: { include: { image: true } },
        reviews: { include: { sender: true } },
        invoices: isAdmin,
        cartToItems: isAdmin,
        chatRoom: isAdmin,
        location: isAdmin,
        purchasedItems: isAdmin,
        user: isAdmin,
      },
    })

    if (!item) throw new NotFoundError()

    return item
  }
)
