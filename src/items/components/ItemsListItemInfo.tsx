import { Image, ImageToItem, Item } from "db"

import { ItemsListItemTitle } from "src/items/components/ItemsListItemTitle"
import { ItemsListItemColor } from "src/items/components/ItemsListItemColor"
import { ItemsListItemPrice } from "src/items/components/ItemsListItemPrice"

interface ItemsListItemInfoProps {
  item: Item & { images: (ImageToItem & { image: Image })[] }
}

export const ItemsListItemInfo = (props: ItemsListItemInfoProps) => {
  const { item } = props

  return (
    <div className="flex justify-between gap-1">
      <div>
        <ItemsListItemTitle item={item} />
        <ItemsListItemColor item={item} />
      </div>

      <ItemsListItemPrice price={item.price} currency={item.currency} ceil />
    </div>
  )
}
