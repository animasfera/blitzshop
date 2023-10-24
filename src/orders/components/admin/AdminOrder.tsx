import { useTranslation } from "react-i18next"
import { RadioGroup } from "@headlessui/react"
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/20/solid"
import {
  Order,
  Price,
  ShippingAddress,
  ShippingMethod,
  PurchasedItem,
  Category,
  Item,
  Image,
  Country,
  LocaleEnum,
  OrderLog,
  OrderStatusEnum,
} from "db"

import { dateFormat } from "src/core/helpers/Helpers"
import { HeadingPage } from "src/core/tailwind-ui/headings/HeadingPage"
import { OptionSelectField } from "src/core/tailwind-ui/application-ui/forms/Select"
import { AdminOrderList } from "src/orders/components/admin/AdminOrderList"
import { AdminOrderSummery } from "src/orders/components/admin/AdminOrderSummery"
import { ShippingsFeeTypeEnum } from "src/core/enums/ShippingFeeTypeEnum"
import { OrderStatusesEnum } from "src/core/enums/OrderStatusEnum"
import { SelectSubmit } from "src/core/tailwind-ui/application-ui/forms/SelectSubmit"

interface AdminOrderProps {
  order: Order & {
    user: {
      email: string
      id: number
      username: string
      firstName: string | null
      lastName: string | null
      phone: string | null
    }
    amount: Price
    orderLog: OrderLog
    shippingMethod: ShippingMethod | null
    shippingAddress:
      | (ShippingAddress & {
          country: Country
        })
      | null
    purchasedItems: (PurchasedItem & {
      amount: Price
      category: Category | null
      item: Item & {
        amount: Price
        user: {
          email: string
          id: number
          username: string
        } | null
      }
      coverImage: Image
    })[]
  }
  statusOrder: OptionSelectField // OrderStatusEnum
  shippingOptions: OptionSelectField[]
}

interface ItemList {
  label: string
  value?: string | null
  button?: {
    id?: string
    select?: boolean
    text: string
  }
}

const handleFullname = ({
  firstName,
  lastName,
}: {
  firstName?: string | null
  lastName?: string | null
}) => {
  return firstName && lastName
    ? `${firstName} ${lastName}`
    : lastName
    ? lastName
    : firstName
    ? firstName
    : null
}

export const AdminOrder = (props: AdminOrderProps) => {
  const { order, statusOrder, shippingOptions } = props
  const { firstName, lastName, phone, email } = order.user

  const { t, i18n } = useTranslation(["pages.admin.orderId", "translation"])

  const orderStatus =
    i18n.resolvedLanguage === LocaleEnum.RU
      ? OrderStatusesEnum[order.status].nameRu
      : OrderStatusesEnum[order.status].nameEn

  const feeType = order.shippingMethod?.feeType
    ? i18n.resolvedLanguage === LocaleEnum.RU
      ? ShippingsFeeTypeEnum[order.shippingMethod?.feeType].nameRu
      : ShippingsFeeTypeEnum[order.shippingMethod?.feeType].nameEn
    : null

  const orderData: ItemList[] = [
    {
      label: t("order.data.status.label"),
      value: orderStatus,
      button: {
        id: `order-status-${order.id}`,
        select: true,
        text: t("translation:change"),
      },
    },
    {
      label: t("order.data.notes.label"),
      value: order.notes,
      button: { text: t("translation:change") },
    },
    {
      label: t("order.data.comment.label"),
      value: order.orderLog.comment,
      button: { text: t("translation:edit") },
    },
  ]

  const contacts: ItemList[] = [
    {
      label: t("order.contacts.list.customer.label"),
      value: handleFullname({ firstName, lastName }),
    },
    {
      label: t("order.contacts.list.email.label"),
      value: email,
    },
    {
      label: t("order.contacts.list.phone.label"),
      value: phone,
    },
  ]

  const shipping: ItemList[] = [
    {
      label: t("order.shipping.list.recipient.label"),
      value: handleFullname({
        firstName: order.shippingAddress?.firstName,
        lastName: order.shippingAddress?.lastName,
      }),
      button: { text: t("translation:edit") },
    },
    {
      label: t("order.contacts.list.phone.label"),
      value: order.shippingAddress?.phone,
    },
    {
      label: t("order.shipping.list.postalCode.label"),
      value: order.shippingAddress?.postalCode,
    },
    {
      label: t("order.shipping.list.country.label"),
      value:
        i18n.resolvedLanguage === LocaleEnum.RU
          ? order.shippingAddress?.country.titleRu
          : order.shippingAddress?.country.titleEn,
    },
    {
      label: t("order.shipping.list.city.label"),
      value: order.shippingAddress?.city,
    },
    {
      label: t("order.shipping.list.address.label"),
      value: order.shippingAddress?.address,
    },
    {
      label: t("order.shipping.list.instructions.label"),
      value: order.shippingAddress?.instructions,
    },
  ]

  const delivery: ItemList[] = [
    {
      label: t("order.delivery.list.title.label"),
      value: order.shippingMethod?.title,
    },
    {
      label: t("order.delivery.list.description.label"),
      value: order.shippingMethod?.description,
    },
    {
      label: t("order.delivery.list.feeType.label"),
      value: feeType,
    },
    {
      label: t("order.delivery.list.fee.label"),
      // !!! поправить когда будет готова сумма доставки
      value: feeType ? `${order.shippingMethod?.fee}` : null,
    },
  ]

  const sections = [
    {
      list: orderData,
    },
    {
      title: t("order.contacts.title"),
      list: contacts,
    },
    {
      title: t("order.shipping.title"),
      list: shipping,
    },
    {
      title: t("order.delivery.title"),
      list: delivery,
    },
  ]

  return (
    <div className="w-full">
      <div className="mb-6 border-b">
        <HeadingPage
          title={t("heading.title", { orderId: order.id })}
          subtitles={[{ text: t("heading.date", { date: dateFormat(order.createdAt) }) }]}
        />
      </div>

      <div className="flex flex-col gap-x-6 gap-y-2 xl:flex-row">
        <AdminOrderList
          sections={sections}
          statusOrder={statusOrder}
          shippingOptions={shippingOptions}
        />
        <AdminOrderSummery order={order} />
      </div>
    </div>
  )
}

export default AdminOrder
