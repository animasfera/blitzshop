import { useMutation, useQuery } from "@blitzjs/rpc"
import React from "react"
import deleteOrderLog from "src/order-logs/mutations/deleteOrderLog"
import updateOrderLog from "src/order-logs/mutations/updateOrderLog"
import getOrderLogs from "src/order-logs/queries/getOrderLogs"
import { OrderFull } from "src/orders/schemas"
import AdminOrderLogList from "./AdminOrderLogList"

interface AdminOrderLogControllerProps {
  order: OrderFull
}

const AdminOrderLogController = (props: AdminOrderLogControllerProps) => {
  const { order } = props
  const [orderLogs, { setQueryData }] = useQuery(getOrderLogs, {
    where: { orderId: order.id },
    orderBy: { createdAt: "desc" },
    include: { user: true },
  })
  const [updateOrderLogMutation] = useMutation(updateOrderLog)
  const [deleteOrderLogMutation] = useMutation(deleteOrderLog)

  return (
    <>
      <AdminOrderLogList
        orderLogs={orderLogs.orderLogs}
        trashButtonClick={(orderLogId: number) => {
          throw new Error("Function not implemented.")
        }}
      />
    </>
  )
}

export default AdminOrderLogController
