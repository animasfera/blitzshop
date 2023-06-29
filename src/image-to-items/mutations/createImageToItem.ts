import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateImageToItemSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateImageToItemSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const imageToItem = await db.imageToItem.create({ data: input })

    return imageToItem
  }
)
