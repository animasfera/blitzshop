import { useQuery } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Order from "src/orders/components/Order"
import getOrder from "src/orders/queries/getOrder"

export const OrderController = () => {
  const orderId = useParam("orderId", "number")
  const [order] = useQuery(getOrder, { id: orderId })

  return <Order order={order} />
}

export default OrderController
