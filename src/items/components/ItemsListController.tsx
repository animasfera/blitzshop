import { usePaginatedQuery } from "@blitzjs/rpc"

import { ListOrNotFoundMessage } from "src/core/components/ListOrNotFoundMessage"
import { ItemsList } from "src/items/components/ItemsList"
import { usePagination } from "src/core/hooks/usePagination"
import getItems from "src/items/queries/getItems"

const ITEMS_PER_PAGE = 20

export const ItemsListController = () => {
  const pagination = usePagination()
  const [{ items, hasMore, count }] = usePaginatedQuery(getItems, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * pagination.page,
    take: ITEMS_PER_PAGE,
  })

  // TODO: add sorts and filters
  return (
    <ListOrNotFoundMessage
      countObjects={count}
      itemsPerPage={ITEMS_PER_PAGE}
      pagination={pagination}
      hasMore={hasMore}
    >
      <ItemsList items={items} />
    </ListOrNotFoundMessage>
  )
}

export default ItemsListController
