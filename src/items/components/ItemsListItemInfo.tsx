import { Item, Price } from "db"

import { ItemsListItemTitle } from "src/items/components/ItemsListItemTitle"
import { ItemsListItemColor } from "src/items/components/ItemsListItemColor"
import { ItemsListItemPrice } from "src/items/components/ItemsListItemPrice"
import { Money } from "src/core/components/Money"

interface ItemsListItemInfoProps {
  item: Item & { amount: Price }
}

export const ItemsListItemInfo = (props: ItemsListItemInfoProps) => {
  const { item } = props

  return (
    <div className="mt-4 flex justify-between gap-1">
      <div>
        <ItemsListItemTitle item={item} />
        <ItemsListItemColor item={item} />
      </div>

      <ItemsListItemPrice amount={item.amount} ceil />
    </div>
  )
}
