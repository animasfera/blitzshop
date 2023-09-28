import { useEffect, useState } from "react"
import { useSession } from "@blitzjs/auth"
import { usePaginatedQuery, useMutation, useQuery, invalidateQuery } from "@blitzjs/rpc"
import { ImageToItem, Image, Item, Price } from "db"

import { ListOrNotFoundMessage } from "src/core/components/ListOrNotFoundMessage"
import { ItemsList } from "src/items/components/ItemsList"
import { useCurrency } from "src/core/hooks/useCurrency"
import { usePagination } from "src/core/hooks/usePagination"
import addProductToCart from "src/carts/mutations/addProductToCart"
import getItems from "src/items/queries/getItems"
import getCart from "src/carts/queries/getCart"

const ITEMS_PER_PAGE = 24

export const ItemsListController = () => {
  const [isLoading, setLoading] = useState(false)
  const session = useSession()
  const currency = useCurrency()
  const [addProductToCartMutation] = useMutation(addProductToCart)
  const [cart] = useQuery(getCart, { userId: session?.userId ?? undefined })
  const pagination = usePagination()

  const [{ items, hasMore, count }] = usePaginatedQuery(getItems, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * pagination.page,
    take: ITEMS_PER_PAGE,
  })

  const handleClick = async (item: Item & { amount: Price }) => {
    setLoading(true)
    console.log("item", item.amount)

    const sessionId = localStorage.getItem("sessionId")

    const res = await addProductToCartMutation({
      sessionId: sessionId ?? null,
      itemId: item.id,
      price: {
        amount: item.amount.amount,
        currency: item.amount.currency,
      },
      currency: currency.currency.name,
    })

    await invalidateQuery(getCart)

    if (!session.user && res?.sessionId) {
      // client: save sessionId in localstorage if user unauth
      localStorage.setItem("sessionId", res.sessionId)
    }

    console.log("res", res)
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
      <ItemsList items={items} cart={cart} isLoading={isLoading} handleClick={handleClick} />
    </ListOrNotFoundMessage>
  )
}

export default ItemsListController
