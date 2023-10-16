import { Item } from "db"

interface ItemsListItemColorProps {
  item: Item
}

export const ItemsListItemColor = (props: ItemsListItemColorProps) => {
  const { item } = props

  return <p className="mt-1 mb-0 text-sm text-gray-500">{item.color}</p>
}
