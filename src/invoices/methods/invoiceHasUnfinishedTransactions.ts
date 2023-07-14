import { Invoice, Transaction, TransactionStatusEnum } from "@prisma/client"

export const invoiceHasUnfinishedTransactions = (
  invoice: Invoice & { transactions: Transaction[] }
) => {
  const unfinishedTransactions = invoice.transactions.find(
    (transaction) =>
      transaction.status === TransactionStatusEnum.PENDING ||
      transaction.status === TransactionStatusEnum.PAYING
  )
  if (unfinishedTransactions) {
    return false
  }
}
