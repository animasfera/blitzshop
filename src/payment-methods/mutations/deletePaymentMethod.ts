import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeletePaymentMethodSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeletePaymentMethodSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const paymentMethod = await db.paymentMethod.deleteMany({ where: { id } })

    return paymentMethod
  }
)
