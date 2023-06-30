import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreatePaymentMethodSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreatePaymentMethodSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const paymentMethod = await db.paymentMethod.create({ data: input })

    return paymentMethod
  }
)
