import { useTranslation } from "react-i18next"
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
  OrderStatusEnum,
} from "db"

import { HeadingSection } from "src/core/tailwind-ui/headings/HeadingSection"
import { OptionSelectField, Select } from "src/core/tailwind-ui/application-ui/forms/Select"
import { AdminOrderSummeryList } from "./AdminOrderSummeryList"
import { AdminOrderSummeryPrice } from "./AdminOrderSummeryPrice"
import { SelectSubmit } from "src/core/tailwind-ui/application-ui/forms/SelectSubmit"

interface AdminOrderSummeryProps {
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
}

export const AdminOrderSummery = (props: AdminOrderSummeryProps) => {
  const { order } = props

  /*
  const [selectedProductsQty, setSelectedProductsQty] = useState<OptionSelectField>(
    quantityItemsOptions.find((el) => cartToItem.qty === el.value) ?? { label: "0", value: 0 }
  )
  */

  const { t } = useTranslation(["pages.admin.orderId"])

  return (
    <section className="mt-4 xl:mt-0 xl:w-2/4">
      <HeadingSection title={t("summary.title")} />

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <AdminOrderSummeryList purchasedItems={order.purchasedItems} />
        <AdminOrderSummeryPrice amount={order.amount} />

        {/*
        <Select
          name={`order-status-${order.id}`}
          defaultValue={shippingOptions.find((el) => order.status === el.value)}
          selected={shippingOptions.find((el) => statusOrder === el.value)}
          options={shippingOptions}
          onChange={async (value: { value: number; label: string }) => {
            await onUpdateCartToItem({ id: cartToItem.id, qty: value.value })
            setSelectedProductsQty(value)
          }}
          disabled={isLoading}
        />
        */}
        {/*
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <button
            type="submit"
            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            Confirm order
          </button>
        </div>
        */}
      </div>
    </section>
  )
}

export default AdminOrderSummery
