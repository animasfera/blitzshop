import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateInvoiceSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateInvoiceSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const invoice = await db.invoice.create({ data: input })

    return invoice
  }
)
