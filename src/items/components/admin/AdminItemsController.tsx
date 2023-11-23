import React from "react"
import { usePaginatedQuery } from "@blitzjs/rpc"

import { ListOrNotFoundMessage } from "src/core/components/ListOrNotFoundMessage"
import { usePagination } from "src/core/hooks/usePagination"
import getItems from "src/items/queries/getItems"

import AdminItemsControllerHeader from "./AdminItemsControllerHeader"
import AdminItemsList from "./AdminItemsList"

const ITEMS_PER_PAGE = 10

const AdminItemsController = () => {
  const pagination = usePagination()
  const [{ items, hasMore, count }] = usePaginatedQuery(getItems, {
    orderBy: { id: "desc" },
    skip: ITEMS_PER_PAGE * pagination.page,
    take: ITEMS_PER_PAGE,
  })

  return (
    <>
      <AdminItemsControllerHeader />
      <ListOrNotFoundMessage
        countObjects={count}
        itemsPerPage={ITEMS_PER_PAGE}
        pagination={pagination}
        hasMore={hasMore}
      >
        <AdminItemsList items={items} />
      </ListOrNotFoundMessage>
    </>
  )
}

export default AdminItemsController
