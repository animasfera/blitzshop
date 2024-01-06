import { Ctx, NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import { startTransaction } from "db/transaction"
import { PrismaDbType } from "types"
import { NotificationsTransactionType } from "src/core/notifications/NotificationsTransaction"
import { z } from "zod"

export const blockInvoiceItemsDbQuery = async (
  input: { invoiceId: number },
  ctx: Ctx,
  $db: PrismaDbType,
  notifications: NotificationsTransactionType
) => {
  const { invoiceId } = input
  const order = await $db.order.findFirst({ where: { invoiceId: invoiceId } })

  if (!order) throw new NotFoundError(`Order with ID: ${invoiceId} not found`)

  const result = await $db.$queryRaw`
    UPDATE "Item" AS i
    SET qty = i.qty - p."qty"
    FROM "PurchasedItem" AS p
    WHERE
      i."id" = p."itemId" AND
      p."orderId" = ${order.id}
    RETURNING i.qty;
  `
  console.log("result", result)

  // Check for negative qty and throw error
  if (result && Array.isArray(result) && result.find((item) => item.qty < 0)) {
    console.log(result.toString())
    throw new Error("Some items are out of stock")
  }

  return true
}

export default resolver.pipe(
  resolver.zod(z.object({ invoiceId: z.number() })),
  resolver.authorize(),
  async (input, ctx) => {
    return startTransaction(blockInvoiceItemsDbQuery, input, ctx)
  }
)
