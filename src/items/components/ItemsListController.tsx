import { useState } from "react"
import { usePaginatedQuery, useMutation, useQuery, invalidateQuery } from "@blitzjs/rpc"
import { Item } from "db"

import { ListOrNotFoundMessage } from "src/core/components/ListOrNotFoundMessage"
import { ItemsList } from "src/items/components/ItemsList"
import { usePagination } from "src/core/hooks/usePagination"
import addItemToCart from "../../cart-to-items/mutations/addItemToCart"

import getItems from "src/items/queries/getItems"
import getCart from "src/carts/queries/getCart"

const ITEMS_PER_PAGE = 48

export const ItemsListController = () => {
  const [isLoading, setLoading] = useState(false)
  const [addProductToCartMutation] = useMutation(addItemToCart)
  const pagination = usePagination()

  const [{ items, hasMore, count }] = usePaginatedQuery(getItems, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * pagination.page,
    take: ITEMS_PER_PAGE,
  })

  const handleClick = async (item: Item) => {
    setLoading(true)

    const res = await addProductToCartMutation({
      itemId: item.id,
    })

    await invalidateQuery(getCart)

    setLoading(false)
  }

  // TODO: add sorts and filters
  return (
    <ListOrNotFoundMessage
      countObjects={count}
      itemsPerPage={ITEMS_PER_PAGE}
      pagination={pagination}
      hasMore={hasMore}
    >
      <ItemsList items={items} isLoading={isLoading} handleClick={handleClick} />
    </ListOrNotFoundMessage>
  )
}

export default ItemsListController
