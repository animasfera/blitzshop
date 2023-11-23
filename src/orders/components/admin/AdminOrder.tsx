import { useTranslation } from "react-i18next"
import { LocaleEnum } from "db"

import { dateFormat } from "src/core/helpers/Helpers"
import { HeadingPage } from "src/core/tailwind-ui/headings/HeadingPage"
import { OptionSelectField } from "src/core/tailwind-ui/application-ui/forms/Select"
import { AdminOrderSectionsList } from "src/orders/components/admin/AdminOrderSectionsList"
import { AdminOrderSummery } from "src/orders/components/admin/AdminOrderSummery"
import { OrderStatusesArray, OrderStatusesEnum } from "src/core/enums/OrderStatusEnum"
import { OrderFull } from "src/orders/schemas"
import { DutyPaymentEnum, ShippingCompanyEnum } from "@prisma/client"
import AdminOrderLog from "./AdminOrderLog"

export type EditableFieldButton = {
  id: string
  options?: OptionSelectField[]
  selected?: string | number | boolean
  type?: "number" | "string" | "select" | "boolean"
}
export type EditableField = {
  label: string
  value?: string | null | boolean | number
  button?: EditableFieldButton
}

interface AdminOrderProps {
  order: OrderFull
  isLoading: boolean
  handleUpdateOrder: (values: any) => Promise<void>
  deleteOrderLog: (id) => void
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
  const { order, isLoading, handleUpdateOrder, deleteOrderLog } = props

  const { t, i18n } = useTranslation(["pages.admin.orderId", "translation"])

  const statusOptions: OptionSelectField[] = Object.values(OrderStatusesArray).map(
    ({ value, nameEn, nameRu }) => ({
      label: i18n.resolvedLanguage === LocaleEnum.ru ? nameRu : nameEn,
      value: value,
    })
  )

  const orderData: EditableField[] = [
    {
      label: t("order.data.status.label"),
      value: order.status,
      button: {
        id: "status",
        type: "select",
        options: statusOptions,
        selected: order.status,
      },
    },
    {
      label: t("order.data.notes.label"),
      value: order.notes,
      button: { id: "notes" },
    },
    {
      label: t("order.data.comment.label"),
      value: order.notes,
      button: { id: "comment" },
    },
  ]

  const contacts: EditableField[] = [
    {
      label: t("order.contacts.list.customer.label"),
      value: handleFullname({ firstName: order.user.firstName, lastName: order.user.lastName }),
    },
    {
      label: t("order.contacts.list.email.label"),
      value: order.user.email,
    },
    {
      label: t("order.contacts.list.phone.label"),
      value: order.shippingAddress?.phone,
    },
  ]

  const shipping: EditableField[] = [
    {
      label: t("order.shipping.list.firstname.label"),
      value: order.shippingAddress?.firstName,
      button: { id: "shippingAddress.firstName" },
    },
    {
      label: t("order.shipping.list.lastname.label"),
      value: order.shippingAddress?.lastName,
      button: { id: "shippingAddress.lastName" },
    },
    {
      label: t("order.contacts.list.phone.label"),
      value: order.shippingAddress?.phone,
      button: { id: "shippingAddress.phone" },
    },
    {
      label: t("order.shipping.list.postalCode.label"),
      value: order.shippingAddress?.postalCode,
      button: { id: "shippingAddress.postalCode" },
    },
    {
      label: t("order.shipping.list.country.label"),
      value:
        i18n.resolvedLanguage === LocaleEnum.ru
          ? order.shippingAddress?.country.titleRu
          : order.shippingAddress?.country.titleEn,
    },
    {
      label: t("order.shipping.list.city.label"),
      value: order.shippingAddress?.city,
      button: { id: "shippingAddress.city" },
    },
    {
      label: t("order.shipping.list.address.label"),
      value: order.shippingAddress?.address,
      button: { id: "shippingAddress.address" },
    },
    {
      label: t("order.shipping.list.instructions.label"),
      value: order.shippingAddress?.instructions,
      button: { id: "shippingAddress.instructions" },
    },
  ]

  const delivery: EditableField[] = [
    {
      label: t("order.data.shippingCompany.label"),
      value: order.shippingCompany,
      button: {
        id: "shippingCompany",
        type: "select",
        options: [
          { label: "...", value: null },
          { label: ShippingCompanyEnum.SDEK, value: ShippingCompanyEnum.SDEK },
          { label: ShippingCompanyEnum.BOXBERRY, value: ShippingCompanyEnum.BOXBERRY },
        ],
        selected: order.shippingCompany || undefined,
      },
    },
    {
      label: t("order.data.shippingDutyPayment.label"),
      value: order.shippingDutyPayment,
      button: {
        id: "shippingDutyPayment",
        type: "select",
        options: [
          { label: "...", value: null },
          { label: DutyPaymentEnum.DDP, value: DutyPaymentEnum.DDP },
          { label: DutyPaymentEnum.DDU, value: DutyPaymentEnum.DDU },
        ],
        selected: order.shippingDutyPayment || undefined,
      },
    },
    {
      label: t("order.data.shippingInsurance.label"),
      value: order.shippingInsurance,
      button: {
        id: "shippingInsurance",
        type: "select",
        options: [
          { label: "...", value: null },
          { label: "Со страховкой", value: true },
          { label: "Без страховки", value: false },
        ],
        selected: order.shippingInsurance,
      },
    },
    // {
    //   label: t("order.data.feeType.label"),
    //   value: order.shippingInsuranceFee ? order.shippingInsuranceFee.toString() : "",
    // },
    {
      label: t("order.data.shippingFee.label"),
      // !!! поправить когда будет готова сумма доставки
      value: order.shippingFee / 100,
      button: {
        id: "shippingFee",
        type: "number",
      },
    },
  ]

  const sections = [
    {
      list: orderData,
    },
    {
      title: t("order.delivery.title"),
      list: delivery,
    },
    {
      title: t("order.contacts.title"),
      list: contacts,
    },
    {
      title: t("order.shipping.title"),
      list: shipping,
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

      <div className="flex flex-col gap-x-6 gap-y-2 xl:flex-row  ">
        <AdminOrderSectionsList
          sections={sections}
          order={order}
          isLoading={isLoading}
          handleUpdateOrder={handleUpdateOrder}
        />
        <div className="basis-1/4">
          <AdminOrderSummery order={order} />
          <AdminOrderLog order={order} trashButtonClick={(id) => deleteOrderLog(id)} />
        </div>
      </div>
    </div>
  )
}

export default AdminOrder
