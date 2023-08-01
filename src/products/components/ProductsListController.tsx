import { usePaginatedQuery } from "@blitzjs/rpc"

import { ListOrNotFoundMessage } from "src/core/components/ListOrNotFoundMessage"
import { ProductsList } from "src/products/components/ProductsList"
import { usePagination } from "src/core/hooks/usePagination"
import getItems from "src/items/queries/getItems"

const ITEMS_PER_PAGE = 20

export const ProductsListController = () => {
  const pagination = usePagination()
  const [{ items, hasMore, count }] = usePaginatedQuery(getItems, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * pagination.page,
    take: ITEMS_PER_PAGE,
  })

  // TODO: add sorts and filters
  return (
    <ListOrNotFoundMessage
      countObjects={count ?? 0}
      itemsPerPage={ITEMS_PER_PAGE}
      pagination={pagination}
      hasMore={hasMore}
    >
      <ProductsList items={items} />
    </ListOrNotFoundMessage>
  )
}
