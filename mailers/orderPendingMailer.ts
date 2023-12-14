import { Order } from "@prisma/client"
import { MailerOptions, mailSenderWithQueue } from "./index"

type OrderPendingMailer = {
  order: Order
}

export function orderPendingMailer(params: OrderPendingMailer, options?: MailerOptions) {
  const { order } = params

  return {
    key: "orderPendingMailer",
    data: {
      orderId: order.id,
    },
  }
}
