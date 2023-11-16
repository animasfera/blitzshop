import { usePaginatedQuery } from "@blitzjs/rpc"
import { useSession } from "@blitzjs/auth"
import { Routes } from "@blitzjs/next"
import { useTranslation } from "react-i18next"

import { ErrorSection } from "src/core/components/sections/Error/ErrorSection"
import { ListOrNotFoundMessage } from "src/core/components/ListOrNotFoundMessage"
import { OrdersList } from "src/orders/components/OrdersList"
import { usePagination } from "src/core/hooks/usePagination"
import getOrders from "src/orders/queries/getOrders"

const ORDERS_PER_PAGE = 100

export const OrdersListController = () => {
  const { userId } = useSession()
  const { t } = useTranslation(["pages.orders", "pages.errors"])
  const pagination = usePagination()

  const [{ orders, hasMore, count }] = usePaginatedQuery(getOrders, {
    orderBy: { id: "desc" },
    skip: ORDERS_PER_PAGE * pagination.page,
    take: ORDERS_PER_PAGE,
    where: userId ? { userId } : {},
  })

  if (!userId) {
    return (
      <ErrorSection
        header={{
          statusCode: 401,
          title: t("pages.errors:401.header.title"),
          message: t("pages.errors:401.header.message"),
        }}
        link={{ href: Routes.LoginPage().href, text: t("401.links.signin") }}
      />
    )
  }

  return (
    <>
      <section className="max-w-xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{t("index.title")}</h1>
        <p className="mt-2 text-sm text-gray-500">{t("index.description")}</p>
      </section>

      <ListOrNotFoundMessage
        countObjects={count}
        itemsPerPage={ORDERS_PER_PAGE}
        pagination={pagination}
        hasMore={hasMore}
      >
        <OrdersList orders={orders} />
      </ListOrNotFoundMessage>
    </>
  )
}

export default OrdersListController
