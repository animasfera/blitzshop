import { usePaginatedQuery } from "@blitzjs/rpc"

import { ListOrNotFoundMessage } from "src/core/components/ListOrNotFoundMessage"
import { AdminOrdersList } from "src/orders/components/admin/AdminOrdersList"
import getOrders from "src/orders/queries/getOrders"
import { usePagination } from "src/core/hooks/usePagination"

const ORDERS_PER_PAGE = 100

export const AdminOrdersListController = () => {
  const pagination = usePagination()

  const [{ orders, hasMore, count }] = usePaginatedQuery(getOrders, {
    orderBy: { id: "desc" },
    skip: ORDERS_PER_PAGE * pagination.page,
    take: ORDERS_PER_PAGE,
  })

  return (
    <section>
      <ListOrNotFoundMessage
        countObjects={count}
        itemsPerPage={ORDERS_PER_PAGE}
        pagination={pagination}
        hasMore={hasMore}
      >
        <AdminOrdersList orders={orders} />
      </ListOrNotFoundMessage>
    </section>
  )
}

export default AdminOrdersListController
