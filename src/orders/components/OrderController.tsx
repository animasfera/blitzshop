import { useQuery } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Order from "src/orders/components/Order"
import getOrder from "src/orders/queries/getOrder"
import { usePayment } from "../../core/hooks/usePayment"

export const OrderController = () => {
  const orderId = useParam("orderId", "number")
  const [order, { refetch }] = useQuery(getOrder, { id: orderId })

  return <Order order={order} />
}

export default OrderController
