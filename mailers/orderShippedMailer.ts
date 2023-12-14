import { Order } from "@prisma/client"
import { MailerOptions, mailSenderWithQueue } from "./index"

type OrderShippedMailer = {
  order: Order
}

export function orderShippedMailer(params: OrderShippedMailer, options?: MailerOptions) {
  const { order } = params

  return {
    key: "orderShippedMailer",
    data: {
      orderId: order.id,
    },
  }
}
