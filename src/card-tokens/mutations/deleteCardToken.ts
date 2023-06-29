import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteCardTokenSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteCardTokenSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const cardToken = await db.cardToken.deleteMany({ where: { id } })

    return cardToken
  }
)
