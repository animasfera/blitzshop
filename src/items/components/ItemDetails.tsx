import { Item } from "db"

interface ItemDetailsProps {
  item: Item
}

export const ItemDetails = (props: ItemDetailsProps) => {
  const { item } = props

  return (
    <>
      {item.description && (
        <div className="mt-10">
          <div className="prose prose-sm mt-4 text-gray-500">{item.description}</div>
        </div>
      )}
    </>
  )
}

export default ItemDetails
