import { useQuery } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Order from "src/orders/components/Order"
import getOrder from "src/orders/queries/getOrder"
import { useSession } from "@blitzjs/auth"
import { UserRoleEnum } from "@prisma/client"
import { AuthorizationError } from "blitz"

export const OrderController = () => {
  const orderId = useParam("orderId", "number")
  const session = useSession()
  const [order, { refetch }] = useQuery(getOrder, { id: orderId })
  if (order.userId !== session.userId && session.role !== UserRoleEnum.ADMIN) {
    throw new AuthorizationError()
  }
  return <Order order={order} />
}

export default OrderController
