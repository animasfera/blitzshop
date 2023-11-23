import { useState } from "react"
import { useMutation, useQuery } from "@blitzjs/rpc"

import { useParam } from "@blitzjs/next"
import { useTranslation } from "react-i18next"
import { AdminOrder } from "src/orders/components/admin/AdminOrder"
import getOrder from "src/orders/queries/getOrder"
import updateOrder from "src/orders/mutations/updateOrder"
import updateShippingAddress from "src/shipping-addresses/mutations/updateShippingAddress"
import updateOrderLog from "src/order-logs/mutations/updateOrderLog"
import { OrderFull } from "../../schemas"
import deleteOrderLog from "src/order-logs/mutations/deleteOrderLog"

export const AdminOrderController = () => {
  const orderId = useParam("orderId", "number")
  const [order, { setQueryData }] = useQuery(getOrder, { id: orderId })
  const [updateOrderMutation] = useMutation(updateOrder)
  const [updateShippingAddressMutation] = useMutation(updateShippingAddress)
  const [updateOrderLogMutation] = useMutation(updateOrderLog)
  const [deleteOrderLogMutation] = useMutation(deleteOrderLog)

  const { i18n } = useTranslation(["pages.admin.orderId", "translation"])

  const [isLoading, setLoading] = useState(false)

  const handleUpdateOrder = async (values: Partial<OrderFull>) => {
    setLoading(true)

    let { shippingAddress, ...restOrder } = values

    if (restOrder.shippingFee) {
      restOrder.shippingFee = Math.round(restOrder.shippingFee * 100)
    }

    let updatedOrder
    if (shippingAddress && order.shippingAddressId) {
      const { id, ...restAShippingAddress } = shippingAddress
      const shippingAddressUpdated = await updateShippingAddressMutation({
        id: order.shippingAddressId,
        ...restAShippingAddress,
      })
      if (shippingAddressUpdated) {
        await setQueryData((oldData) => {
          return { ...order, ...{ shippingAddress: shippingAddressUpdated } }
        })
      }
    } else {
      updatedOrder = await updateOrderMutation({ id: order.id, ...restOrder })
      if (updatedOrder) {
        await setQueryData((oldData) => {
          return { ...oldData, ...updatedOrder }
        })
      }
    }

    setLoading(false)
  }

  return (
    <AdminOrder
      order={order}
      isLoading={isLoading}
      handleUpdateOrder={handleUpdateOrder}
      deleteOrderLog={async (id) => {
        await deleteOrderLogMutation({ id: id })
        await setQueryData((oldData) => {
          return { ...order }
        })
      }}
    />
  )
}

export default AdminOrderController
