import Link from "next/link"
import { useTranslation } from "react-i18next"
import { Order, Price, ShippingMethod } from "db"

import { Money } from "src/core/components/Money"
import { DateWithTime } from "src/core/components/Date"
import { Button } from "src/core/tailwind-ui/application-ui/elements/buttons/Button"

interface AdminOrdersListItemProps {
  order: Order & {
    user: { id: number; email: string; username: string }
    amount: Price
    shippingMethod: ShippingMethod | null
  }
}

export const AdminOrdersListItem = (props: AdminOrdersListItemProps) => {
  const { order } = props
  const { id, createdAt, amount, status, user } = order

  const { t } = useTranslation(["pages.admin.orders"])

  return (
    <tr>
      <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 md:w-auto md:max-w-none md:pl-0">
        {id}
        <dl className="font-normal xl:hidden">
          <dt className="sr-only">{t("table.headers.createdAt")}</dt>
          <dd className="mt-1 truncate text-gray-700">
            <DateWithTime date={createdAt} />
          </dd>
          <dt className="sr-only md:hidden">{t("table.headers.email")}</dt>
          <dd className="mt-1 truncate text-gray-500 md:hidden">{user.email}</dd>
          <dt className="sr-only md:hidden">{t("table.headers.status")}</dt>
          <dd className="mt-1 truncate text-gray-500 sm:hidden">{status}</dd>
        </dl>
      </td>
      <td className="hidden px-3 py-4 text-sm text-gray-500 xl:table-cell">
        <DateWithTime date={createdAt} />
      </td>
      <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">{user.email}</td>
      <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{status}</td>
      <td className="px-3 py-4 text-sm text-gray-500">
        <Money amount={amount.amount} currency={amount.currency} />
      </td>
      <td className="py-4 pl-3 pr-4 text-right text-sm font-medium md:pr-0">
        <Link href={"#"}>
          <Button buttonText={t("table.buttons.view")} variant={"link"} size={"sm"} />
        </Link>
      </td>
    </tr>
  )
}

export default AdminOrdersListItem
