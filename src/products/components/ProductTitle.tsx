import { Item } from "db"

interface ProductTitleProps {
  item: Item
}

export const ProductTitle = (props: ProductTitleProps) => {
  const { item } = props

  return <h1 className="text-xl font-medium text-gray-900">{item.title}</h1>
}
