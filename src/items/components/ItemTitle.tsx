import { Category, Item } from "db"

interface ItemTitleProps {
  item: Item & { category: Category | null }
}

export const ItemTitle = (props: ItemTitleProps) => {
  const { item } = props

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-medium text-gray-900 m-0">{item.title}</h1>
      {item.category && <p className="text-gray-500 m-0">{item.category?.titleRu}</p>}
    </div>
  )
}

export default ItemTitle
