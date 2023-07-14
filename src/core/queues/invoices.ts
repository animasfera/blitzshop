import { NotFoundError } from "blitz"
import db from "db"
import Queue from "bull"
import {
  RefundStatusEnum,
  InvoiceStatusEnum,
  UserRoleEnum,
  TransactionStatusEnum,
} from "@prisma/client"

import createMockContext, { createAdminMockContext } from "src/auth/components/CreateMockContext"
import startRefundPayment from "src/invoices/mutations/startRefundPayment"
import { GlobalRef } from "../index"

/**
 * Collect payment orders to CARDS and start automatic payouts
 * @param job
 */
export const processInvoicesCronJob = async (job) => {
  try {
    console.log("Start CRON cronFindInvoicesToStart")
    const user = await db.user.findFirst({ where: { role: UserRoleEnum.ADMIN } })
    if (!user) {
      throw new NotFoundError()
    }
    const { ctx } = await createMockContext({ user })

    const invoices = await db.invoice.findMany({
      include: { parentItem: true },
      where: {
        status: RefundStatusEnum.PENDING,
        transactions: {
          none: {
            status: {
              in: [
                TransactionStatusEnum.PAYING,
                TransactionStatusEnum.PENDING,
                TransactionStatusEnum.FAILED,
              ],
            },
          },
        },
        // ???
        // type: PaymentType.refund,
      },
    })

    invoices.forEach((invoice) => {
      // ??? invoice.type
      switch (invoice.status) {
        // ?? сase PaymentType.refund:
        case InvoiceStatusEnum.REFUNDED:
          void InvoicesQueue.add("processRefundInvoice", { id: invoice.id })
          break
        // ?? case PaymentType.sale:
        case InvoiceStatusEnum.COMPLETED:
          // Sale invoices are handled during booking
          break
        default:
          break
      }
    })
  } catch (e) {
    console.error(e)
  }
}

const processRefundInvoice = async (job) => {
  console.log("Запуск processRefundInvoice")
  const { id } = job.data

  try {
    const ctx = await createAdminMockContext()
    await startRefundPayment({ invoice: { id } }, ctx)
  } catch (e) {
    console.error(e)
  }
}

export const initInvoicesQueue = () => {
  console.log("Started Invoices Queue")

  const invoicesQueue = new Queue("invoices")

  void invoicesQueue.process("cronFindInvoicesToStart", processInvoicesCronJob)
  void invoicesQueue.process("processRefundInvoice", processRefundInvoice)

  return invoicesQueue
}

let queueRef = new GlobalRef<Queue.Queue<any>>(`leela.queue.invoices`)
if (!queueRef.value) {
  queueRef.value = initInvoicesQueue()
}
export const InvoicesQueue = queueRef.value

export const initInvoicesCron = () => {
  void InvoicesQueue.add("cronFindInvoicesToStart", {}, { repeat: { cron: "0 * * * *" } })
}
