"use client"
import { useQuery } from "@blitzjs/rpc"
import { useParams } from "next/navigation"

import Order from "src/orders/components/Order"
import getOrder from "src/orders/queries/getOrder"

export const OrderController = () => {
  const orderId: number = parseInt((useParams()?.orderId as any) || "-1")
  const [order] = useQuery(getOrder, { id: orderId })

  return <Order order={order} />
}

export default OrderController
