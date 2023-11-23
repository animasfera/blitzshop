import { useState } from "react"
import { invalidateQuery, useMutation, usePaginatedQuery, useQuery } from "@blitzjs/rpc"

import { useParam } from "@blitzjs/next"
import { useTranslation } from "react-i18next"
import { AdminOrder } from "src/orders/components/admin/AdminOrder"
import getOrder from "src/orders/queries/getOrder"
import updateOrder from "src/orders/mutations/updateOrder"
import updateShippingAddress from "src/shipping-addresses/mutations/updateShippingAddress"
import { OrderFull } from "../../schemas"
import getOrderLogs from "src/order-logs/queries/getOrderLogs"

export const AdminOrderController = () => {
  const orderId = useParam("orderId", "number")
  const [order, { setQueryData, refetch }] = useQuery(getOrder, { id: orderId })
  const [{ orderLogs, hasMore }, { refetch: refetchOrderLogs }] = usePaginatedQuery(getOrderLogs, {
    where: { orderId: order.id },
  })
  const [updateOrderMutation] = useMutation(updateOrder)
  const [updateShippingAddressMutation] = useMutation(updateShippingAddress)

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
        invalidateQuery(getOrderLogs)
        await setQueryData((oldData) => {
          return { ...oldData, ...updatedOrder }
        })
        refetch()
      }
    }

    setLoading(false)
  }

  return <AdminOrder order={order} isLoading={isLoading} handleUpdateOrder={handleUpdateOrder} />
}

export default AdminOrderController
