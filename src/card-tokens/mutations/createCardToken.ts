import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateCardTokenSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateCardTokenSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const cardToken = await db.cardToken.create({ data: input })

    return cardToken
  }
)
