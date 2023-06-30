import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteInvoiceSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteInvoiceSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const invoice = await db.invoice.deleteMany({ where: { id } })

    return invoice
  }
)
