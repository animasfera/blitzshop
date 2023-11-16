import { useTranslation } from "react-i18next"

import { HeadingSection } from "src/core/tailwind-ui/headings/HeadingSection"
import { AdminOrderSummeryList } from "./AdminOrderSummeryList"
import { AdminOrderSummeryPrice } from "./AdminOrderSummeryPrice"
import { OrderFull } from "../../schemas"

interface AdminOrderSummeryProps {
  order: OrderFull
}

export const AdminOrderSummery = (props: AdminOrderSummeryProps) => {
  const { order } = props

  const { t } = useTranslation(["pages.admin.orderId"])

  return (
    <section className="mt-4 xl:mt-0 xl:w-2/4">
      <HeadingSection title={t("summary.title")} />

      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <AdminOrderSummeryList purchasedItems={order.items} />
        <AdminOrderSummeryPrice order={order} />

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
