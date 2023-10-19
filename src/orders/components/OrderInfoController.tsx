import { useQuery } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import OrderInfo from "src/orders/components/OrderInfo"
import getOrder from "src/orders/queries/getOrder"

export const OrderInfoController = () => {
  const orderId = useParam("orderId", "number")
  const [order] = useQuery(getOrder, { id: orderId })

  return <OrderInfo order={order} />
}

export default OrderInfoController
