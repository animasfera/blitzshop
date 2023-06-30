import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdatePaymentMethodSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdatePaymentMethodSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const paymentMethod = await db.paymentMethod.update({
      where: { id },
      data,
    })

    return paymentMethod
  }
)
