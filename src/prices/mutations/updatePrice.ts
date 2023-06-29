import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdatePriceSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdatePriceSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const price = await db.price.update({ where: { id }, data })

    return price
  }
)
