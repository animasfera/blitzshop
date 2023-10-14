import { CartToItem, Image as ImageDb, ImageToItem, Item, Price } from "db"

import { CartItemsListItemTitle } from "src/carts/components/CartItemsListItem/CartItemsListItemTitle"
import { CartItemsListItemPrice } from "src/carts/components/CartItemsListItem/CartItemsListItemPrice"

interface CartItemsListItemInfoProps {
  cartToItem: CartToItem & {
    item: Item & {
      amount: Price
      coverImage: ImageToItem & {
        image: ImageDb
      }
    }
  }
}

export const CartItemsListItemInfo = (props: CartItemsListItemInfoProps) => {
  const { cartToItem } = props

  return (
    <div className="relative flex flex-col gap-x-6 gap-y-2 pr-9">
      <CartItemsListItemTitle itemId={cartToItem.itemId} title={cartToItem.item.title} />

      <div className="flex flex-row gap-x-4 text-sm">
        {cartToItem.item.color && <p className="text-gray-500">{cartToItem.item.color}</p>}
        {cartToItem.item.color && cartToItem.item.weight > 0 && (
          <div className="border-l border-gray-200" />
        )}
        {cartToItem.item.weight > 0 && (
          <p className="text-gray-500">{cartToItem.item.weight > 0}</p>
        )}
      </div>

      <CartItemsListItemPrice amount={cartToItem.item.amount} />
    </div>
  )
}

export default CartItemsListItemInfo

/*
{cartToItem.item.color && <p className="text-gray-500">{cartToItem.item.color}</p>}
        {cartToItem.item.weight > 0 && (
          <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
            {cartToItem.item.weight}
          </p>
        )}
*/
