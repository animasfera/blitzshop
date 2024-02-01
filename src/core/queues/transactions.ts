import db from "db"
import { DateTime } from "luxon"
import Queue from "bull"
import { TransactionStatusEnum, TransactionTypeEnum } from "@prisma/client"

import { createAdminMockContext } from "src/auth/components/CreateMockContext"
import syncTransactionWithRemote from "src/transactions/mutations/syncTransactionWithRemote"
import startPaymentOnTransaction from "src/transactions/mutations/startPaymentOnTransaction"
import { GlobalRef } from "../index"

export const syncHangingTransactionsCronJob = async () => {
  // Найти зависшие транзакции которые проходят через оплату по карте через
  // российскую платежную систему и синхронизировать их
  // TODO important this will not work with refunds
  const hangingTransactions = await db.transaction.findMany({
    where: {
      status: { in: [TransactionStatusEnum.PENDING, TransactionStatusEnum.PAYING] },
      createdAt: { lte: DateTime.now().minus({ hours: 24 }).toJSDate().toISOString() },
    },
    select: {
      id: true,
    },
  })

  for (let hangingTransaction of hangingTransactions) {
    void TransactionsQueue.add("syncTransaction", { id: hangingTransaction.id })
  }
}

const startPaymentsOnTransactionJob = async (job) => {
  const { id } = job.data
  const adminCtx = await createAdminMockContext()
  await startPaymentOnTransaction({ id }, adminCtx)
}

export const startPaymentsOnTransactionsCronJob = async (job) => {
  // TODO prevent twice
  // TODO SPLIT FOR PAYOUTS/REFUNDS!!!
  const pendingTransactions = await db.transaction.findMany({
    where: {
      type: { in: [TransactionTypeEnum.REFUND] },
      status: TransactionStatusEnum.PENDING,
    },
    select: {
      id: true,
    },
  })

  for (let transaction of pendingTransactions) {
    void TransactionsQueue.add("startPaymentsOnTransactionJob", { id: transaction.id })
  }
}

const syncTransactionJob = async (job) => {
  const { id } = job.data

  try {
    const adminCtx = await createAdminMockContext()
    await syncTransactionWithRemote({ id }, adminCtx)
  } catch (e) {}
}

export const initTransactionsQueue = () => {
  console.log("Started Transactions Queue")

  const transactionsQueue = new Queue("transactions")

  void transactionsQueue.process("syncHangingTransactionsCronJob", syncHangingTransactionsCronJob)
  // void transactionsQueue.process("startPaymentsOnTransactionJob", startPaymentsOnTransactionJob)
  // void transactionsQueue.process(
  //   "startPaymentsOnTransactionsCronJob",
  //   startPaymentsOnTransactionsCronJob
  // )

  void transactionsQueue.process("syncTransaction", syncTransactionJob)

  return transactionsQueue
}
let queueRef = new GlobalRef<Queue.Queue<any>>(`leela.queue.transactions`)
if (!queueRef.value) {
  queueRef.value = initTransactionsQueue()
}
export const TransactionsQueue = queueRef.value

export const initTransactionsCron = () => {
  // void TransactionsQueue.add(
  //   "startPaymentsOnTransactionsCronJob",
  //   {},
  //   { repeat: { cron: "0 * * * *" } }
  // )
  void TransactionsQueue.add(
    "syncHangingTransactionsCronJob",
    {},
    { repeat: { cron: "0 * * * *" } }
  )
}
