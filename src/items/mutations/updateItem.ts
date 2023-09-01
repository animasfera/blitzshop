import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateItemSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateItemSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const item = await db.item.update({
      where: { id },
      data,
      include: {
        _count: true,
        amount: true,
        category: true,
        coverImage: { include: { image: true } },
        images: { include: { image: true } },
        reviews: { include: { sender: true } },
      },
    })

    return item
  }
)
