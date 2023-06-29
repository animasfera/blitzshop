import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreatePriceSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreatePriceSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const price = await db.price.create({ data: input })

    return price
  }
)
