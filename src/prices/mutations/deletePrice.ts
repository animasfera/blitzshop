import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeletePriceSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeletePriceSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const price = await db.price.deleteMany({ where: { id } })

    return price
  }
)
