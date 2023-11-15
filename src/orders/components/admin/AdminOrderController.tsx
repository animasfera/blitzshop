import { useState } from "react"
import { invalidateQuery, useMutation, useQuery } from "@blitzjs/rpc"

import { useParam } from "@blitzjs/next"
import { useTranslation } from "react-i18next"
import { LocaleEnum, OrderStatusEnum } from "db"

import { OrderStatusesArray, OrderStatusesEnum } from "src/core/enums/OrderStatusEnum"
import { OptionSelectField } from "src/core/tailwind-ui/application-ui/forms/Select"
import { AdminOrder } from "src/orders/components/admin/AdminOrder"
import getOrder from "src/orders/queries/getOrder"
import updateOrder from "src/orders/mutations/updateOrder"
import updateShippingAddress from "src/shipping-addresses/mutations/updateShippingAddress"
import updateOrderLog from "src/order-logs/mutations/updateOrderLog"

export const AdminOrderController = () => {
  const orderId = useParam("orderId", "number")
  const [order, { setQueryData }] = useQuery(getOrder, { id: orderId })
  const [updateOrderMutation] = useMutation(updateOrder)
  const [updateShippingAddressMutation] = useMutation(updateShippingAddress)
  const [updateOrderLogMutation] = useMutation(updateOrderLog)

  const { i18n } = useTranslation(["pages.admin.orderId", "translation"])

  const [isLoading, setLoading] = useState(false)

  const handleUpdateOrder = async (values: any) => {
    setLoading(true)

    const isExistStatus = Object.keys(values).some((el) => el === "status")
    const isExistOrder = Object.keys(values).some((el) => el === "notes")
    const isExistOrderLog = Object.keys(values).some((el) => el === "comment")

    let updatedOrder
    if (isExistStatus) {
      updatedOrder = await updateOrderMutation({ id: order.id, ...values })
    } else if (isExistOrder) {
      updatedOrder = await updateOrderMutation({ id: order.id, ...values })
    } else {
      const shippingAddress = await updateShippingAddressMutation({
        id: order.shippingAddressId,
        ...values,
      })
      await setQueryData((oldData) => {
        return { ...order, ...{ shippingAddress: shippingAddress } }
      })
    }

    if (updatedOrder) {
      await setQueryData((oldData) => {
        return { ...oldData, ...updatedOrder }
      })
    }

    setLoading(false)
  }

  return <AdminOrder order={order} isLoading={isLoading} handleUpdateOrder={handleUpdateOrder} />
}

export default AdminOrderController
