import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"
import { PrismaDbType } from "types"

import { CreateInvoiceSchema } from "../schemas"
import { Prisma } from "@prisma/client"

const CreateInvoice = z.object({
  invoice: CreateInvoiceSchema,
})
type CreateInvoiceType = z.infer<typeof CreateInvoice>

export const createInvoiceDbQuery = async (data: CreateInvoiceType, ctx, $db: PrismaDbType) => {
  // START TRANSACTION
  let invoiceData = { ...data.invoice } as Prisma.InvoiceCreateInput
  return $db.invoice.create({ data: invoiceData })
  // END TRANSACTION
}

export default resolver.pipe(
  resolver.zod(CreateInvoice),
  resolver.authorize(),
  async (input, ctx) => {
    // @ts-ignore
    return await db.$transaction(async ($db) => {
      return createInvoiceDbQuery(input, ctx, $db)
    })
  }
)
