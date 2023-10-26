"use client"
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
import { useParams } from "next/navigation"

export const AdminOrderController = () => {
  const orderId: any = useParams()
  const [order] = useQuery(getOrder, { id: parseInt(orderId.orderId) })
  const [updateOrderMutation] = useMutation(updateOrder)
  const [updateShippingAddressMutation] = useMutation(updateShippingAddress)
  const [updateOrderLogMutation] = useMutation(updateOrderLog)

  const { i18n } = useTranslation(["pages.admin.orderId", "translation"])

  const shippingOptions: OptionSelectField[] = Object.values(OrderStatusesArray).map(
    ({ value, nameEn, nameRu }) => ({
      label: i18n.resolvedLanguage === LocaleEnum.RU ? nameRu : nameEn,
      value: value,
    })
  )

  const handleStatusOrder = (status: OrderStatusEnum): OptionSelectField => {
    return (
      shippingOptions.find((el) => status === el.value) ?? {
        value: OrderStatusesEnum[status].value,
        label:
          i18n.resolvedLanguage === LocaleEnum.RU
            ? OrderStatusesEnum[status].nameRu
            : OrderStatusesEnum[status].nameEn,
      }
    )
  }

  const [isLoading, setLoading] = useState(false)
  const [statusOrder, setStatusOrder] = useState<OptionSelectField>(handleStatusOrder(order.status))

  const handleUpdateOrder = async (values: any) => {
    setLoading(true)

    const isExistStatus = Object.keys(values).some((el) => el === "status")
    const isExistOrder = Object.keys(values).some((el) => el === "notes")
    const isExistOrderLog = Object.keys(values).some((el) => el === "comment")

    if (isExistStatus) {
      const res = await updateOrderMutation({ id: order.id, ...values })
      await updateOrderLogMutation({ id: order.orderLogId, ...values })

      setStatusOrder(handleStatusOrder(res.status))
    } else if (isExistOrder) {
      await updateOrderMutation({ id: order.id, ...values })
    } else if (isExistOrderLog) {
      await updateOrderLogMutation({ id: order.orderLogId, ...values })
    } else {
      await updateShippingAddressMutation({ id: order.shippingAddressId, ...values })
    }

    await invalidateQuery(getOrder)

    setLoading(false)
  }

  return (
    <AdminOrder
      order={order}
      statusOrder={statusOrder}
      shippingOptions={shippingOptions}
      isLoading={isLoading}
      handleUpdateOrder={handleUpdateOrder}
    />
  )
}

export default AdminOrderController
