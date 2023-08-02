import { Category, Item } from "db"

interface ProductTitleProps {
  item: Item & { category: Category | null }
}

export const ProductTitle = (props: ProductTitleProps) => {
  const { item } = props

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-medium text-gray-900 m-0">{item.title}</h1>
      {item.category && <p className="text-gray-500 m-0">{item.category?.titleRu}</p>}
    </div>
  )
}
