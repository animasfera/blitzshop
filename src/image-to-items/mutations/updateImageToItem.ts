import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateImageToItemSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateImageToItemSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const imageToItem = await db.imageToItem.update({ where: { id }, data })

    return imageToItem
  }
)
