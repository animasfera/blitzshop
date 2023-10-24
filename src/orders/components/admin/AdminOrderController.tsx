import { useState } from "react"
import { useQuery } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"
import { useTranslation } from "react-i18next"
import { LocaleEnum, OrderStatusEnum } from "db"

import { OrderStatusesArray, OrderStatusesEnum } from "src/core/enums/OrderStatusEnum"
import { OptionSelectField } from "src/core/tailwind-ui/application-ui/forms/Select"
import { AdminOrder } from "src/orders/components/admin/AdminOrder"
import getOrder from "src/orders/queries/getOrder"

export const AdminOrderController = () => {
  const orderId = useParam("orderId", "number")
  const [order] = useQuery(getOrder, { id: orderId })

  const { t, i18n } = useTranslation(["pages.admin.orderId", "translation"])

  const shippingOptions: OptionSelectField[] = Object.values(OrderStatusesArray).map(
    ({ value, nameEn, nameRu }) => ({
      label: i18n.resolvedLanguage === LocaleEnum.RU ? nameRu : nameEn,
      value: value,
    })
  )

  // order.status
  // OrderStatusEnum
  const [statusOrder, setStatusOrder] = useState<OptionSelectField>(
    shippingOptions.find((el) => order.status === el.value) ?? {
      value: OrderStatusesEnum[order.status].value,
      label:
        i18n.resolvedLanguage === LocaleEnum.RU
          ? OrderStatusesEnum[order.status].nameRu
          : OrderStatusesEnum[order.status].nameEn,
    }
  )

  /*
  const handleChangeOrderStatus = async ({ value }: { value: OrderStatusEnum }) => {
    setStatusOrder(value)
  }
  */

  return <AdminOrder order={order} statusOrder={statusOrder} shippingOptions={shippingOptions} />
}

export default AdminOrderController
