import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"

import { ListOrNotFoundMessage } from "src/core/components/ListOrNotFoundMessage"
import { OrdersList } from "src/orders/components/OrdersList"
import getOrders from "src/orders/queries/getOrders"
import { usePagination } from "src/core/hooks/usePagination"

const ORDERS_PER_PAGE = 100

const orders = [
  {
    number: "4376",
    status: "Delivered on January 22, 2021",
    href: "#",
    invoiceHref: "#",
    products: [
      {
        id: 1,
        name: "Machined Brass Puzzle",
        href: "#",
        price: "$95.00",
        color: "Brass",
        size: '3" x 3" x 3"',
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/order-history-page-07-product-01.jpg",
        imageAlt: "Brass puzzle in the shape of a jack with overlapping rounded posts.",
      },
      // More products...
    ],
  },
  // More orders...
]

export const AdminOrderController = () => {
  const pagination = usePagination()
  const router = useRouter()
  const [{ orders: data, hasMore, count }] = usePaginatedQuery(getOrders, {
    orderBy: { id: "asc" },
    skip: ORDERS_PER_PAGE * pagination.page,
    take: ORDERS_PER_PAGE,
  })

  const { t } = useTranslation(["pages.orders"])

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

export default AdminOrderController
