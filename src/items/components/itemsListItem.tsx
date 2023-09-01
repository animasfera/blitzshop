import { ImageToItem, Image, Item, Price } from "db"

import { ItemsListItemImage } from "src/items/components/ItemsListItemImage"
import { ItemsListItemInfo } from "src/items/components/ItemsListItemInfo"

interface ItemsListItemProps {
  item: Item & {
    amount: Price
    coverImage: ImageToItem & { image: Image }
  }
}

export const ItemsListItem = (props: ItemsListItemProps) => {
  const { item } = props

  return (
    <li className="group relative">
      <ItemsListItemImage image={item.coverImage.image} />
      <ItemsListItemInfo item={item} />
    </li>
  )
}
