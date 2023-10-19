import { resolver } from "@blitzjs/rpc"
import { TransactionStatusEnum } from "@prisma/client"
import syncTransactionWithRemote from "src/transactions/mutations/syncTransactionWithRemote"
import db from "db"
import { InvoiceModel } from "db/zod"
import { NotFoundError } from "blitz"

export default resolver.pipe(
  resolver.zod(InvoiceModel.pick({ id: true })),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const invoice = await db.invoice.findUnique({
      where: { id },
      include: {
        transactions: true,
      },
    })
    if (!invoice) {
      throw new NotFoundError()
    }

    let canPay = true

    const pendingTransactions = invoice.transactions.filter(
      (transaction) => transaction.status === TransactionStatusEnum.PENDING
    )
    const finishedTransactions = invoice.transactions.filter(
      (transaction) => transaction.status === TransactionStatusEnum.FINISHED
    )
    const payingTransactions = invoice.transactions.filter(
      (transaction) => transaction.status === TransactionStatusEnum.PAYING
    )

    if (pendingTransactions.length > 0 || payingTransactions.length > 0) {
      // IF pending transactions for this invoice are found,
      // try to find the related transaction on the remote server and update the status
      // of local transaction.
      // If no remote transactions are found, mark local transaction as failed and exit from the
      // job. The invoice will be restarted later again by cron job
      console.log(`Found ${pendingTransactions.length} pending transactions`)
      canPay = false
      for (const transaction of pendingTransactions) {
        await syncTransactionWithRemote({ id: transaction.id }, ctx)
      }
    } else if (finishedTransactions.length > 0) {
      canPay = false
    }

    return {
      invoice,
      pending: pendingTransactions.length,
      paying: payingTransactions.length,
      finished: finishedTransactions.length,
      canPay,
    }
  }
)
