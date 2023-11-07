import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteImageToItemSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteImageToItemSchema),
  resolver.authorize("ADMIN"),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const imageToItem = await db.imageToItem.deleteMany({ where: { id } })

    return imageToItem
  }
)
