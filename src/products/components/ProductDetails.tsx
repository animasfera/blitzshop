import { Item } from "db"

interface ProductDetailsProps {
  item: Item
}

export const ProductDetails = (props: ProductDetailsProps) => {
  const { item } = props

  return (
    <>
      {item.description && (
        <div className="mt-10">
          <h2 className="text-sm font-medium text-gray-900">Description</h2>

          <div className="prose prose-sm mt-4 text-gray-500">{item.description}</div>
        </div>
      )}
    </>
  )
}
