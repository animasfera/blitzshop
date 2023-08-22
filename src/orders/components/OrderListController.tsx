import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"

import { OrderList } from "src/orders/components/OrderList"
import getOrders from "src/orders/queries/getOrders"

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

export const OrderListController = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ orders: data, hasMore }] = usePaginatedQuery(getOrders, {
    orderBy: { id: "asc" },
    skip: ORDERS_PER_PAGE * page,
    take: ORDERS_PER_PAGE,
  })

  const { t } = useTranslation(["pages.orders"])

  return (
    <>
      <section className="max-w-xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{t("index.title")}</h1>
        <p className="mt-2 text-sm text-gray-500">{t("index.description")}</p>
      </section>

      <OrderList orders={orders} />
    </>
  )
}

export default OrderListController
