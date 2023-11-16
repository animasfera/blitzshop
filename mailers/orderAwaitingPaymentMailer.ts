import { Order } from "@prisma/client"
import { MailerOptions, mailSenderWithQueue } from "./index"

type OrderAwaitingPaymentMailer = {
  order: Order
}

export function orderAwaitingPaymentMailer(
  params: OrderAwaitingPaymentMailer,
  options?: MailerOptions
) {
  const { order } = params

  return {
    key: "orderAwaitingPaymentMailer",
    data: {
      orderId: order.id,
    },
  }
}
