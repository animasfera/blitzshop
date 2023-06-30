import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateInvoiceSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateInvoiceSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const invoice = await db.invoice.update({ where: { id }, data })

    return invoice
  }
)
