import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateCardTokenSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateCardTokenSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const cardToken = await db.cardToken.update({ where: { id }, data })

    return cardToken
  }
)
