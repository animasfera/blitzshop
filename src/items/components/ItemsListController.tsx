import { useState } from "react"
import { usePaginatedQuery, useMutation, useQuery, invalidateQuery } from "@blitzjs/rpc"
import { Item } from "db"

import { ListOrNotFoundMessage } from "src/core/components/ListOrNotFoundMessage"
import { ItemsList } from "src/items/components/ItemsList"
import { usePagination } from "src/core/hooks/usePagination"
import addItemToCart from "../../cart-to-items/mutations/addItemToCart"

import getItems from "src/items/queries/getItems"
import getCart from "src/carts/queries/getCart"
import CategoryFilter from "src/categories/components/CategoryFilter"
import getCategories from "src/categories/queries/getCategories"
import { useTranslation } from "react-i18next"

const ITEMS_PER_PAGE = 48

export const ItemsListController = () => {
  const [filter, setFilter] = useState({})

  const { t } = useTranslation(["pages.products"])
  const [isLoading, setLoading] = useState(false)
  const [addProductToCartMutation] = useMutation(addItemToCart)
  const pagination = usePagination()
  const [{ categories }] = usePaginatedQuery(getCategories, {
    orderBy: { id: "asc" },
  })
  const [{ items, hasMore, count }] = usePaginatedQuery(getItems, {
    where: { ...filter },
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
    <>
      <CategoryFilter
        initialValues={{ categoryId: 0 }}
        categories={categories}
        _onChange={(data) => {
          setFilter(data)
        }}
        onSubmit={() => {}}
      />
      <ListOrNotFoundMessage
        countObjects={count}
        itemsPerPage={ITEMS_PER_PAGE}
        pagination={pagination}
        hasMore={hasMore}
      >
        <ItemsList items={items} isLoading={isLoading} handleClick={handleClick} />
      </ListOrNotFoundMessage>
    </>
  )
}

export default ItemsListController
