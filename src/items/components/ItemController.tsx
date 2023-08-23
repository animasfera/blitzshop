import { useQuery } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Product from "src/items/components/Item"
import getItem from "src/items/queries/getItem"

export const ItemController = () => {
  const itemId = useParam("itemId", "number")
  const [item] = useQuery(getItem, { id: itemId })

  return <Product item={item} />
}

export default ItemController
