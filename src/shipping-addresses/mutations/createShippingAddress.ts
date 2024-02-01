import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateShippingAddressSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateShippingAddressSchema),
  resolver.authorize(),
  async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    let data = {
      userId: ctx.session.userId,
      ...input,
    }

    // @ts-ignore
    const shippingAddress = await db.shippingAddress.create({ data })

    return shippingAddress
  }
)
