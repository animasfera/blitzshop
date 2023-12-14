import { Order } from "@prisma/client"
import { MailerOptions, mailSenderWithQueue } from "./index"

type OrderProcessingMailer = {
  order: Order
}

export function orderProcessingMailer(params: OrderProcessingMailer, options?: MailerOptions) {
  const { order } = params

  return {
    key: "orderProcessingMailer",
    data: {
      orderId: order.id,
    },
  }
}
