import { useEffect, useState } from "react"
import { CheckIcon, ClockIcon, XMarkIcon } from "@heroicons/react/20/solid"
import { CartToItem, Image as ImageDb, ImageToItem, Item } from "db"

import { OptionSelectField, Select } from "src/core/tailwind-ui/application-ui/forms/Select"
import { ButtonCircular } from "src/core/tailwind-ui/application-ui/elements/buttons/ButtonCircular"
import { CartItemsListItemImage } from "src/carts/components/CartItemsListItem/CartItemsListItemImage"
import { CartItemsListItemInfo } from "src/carts/components/CartItemsListItem/CartItemsListItemInfo"
import { CartItemWithItem } from "../../../types"

interface CartItemsListItemProps {
  cartToItem: CartItemWithItem
  isLoading: boolean

  onUpdateCartToItem: ({ id, qty }: { id: number; qty: number }) => Promise<void>
  onDeleteCartToItem: (id: number) => Promise<void>
}

// TODO: сделать количество значений в зависимости от количества товара
const quantityItemsOptions: OptionSelectField[] = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
  { label: "6", value: 6 },
  { label: "7", value: 7 },
  { label: "8", value: 8 },
  { label: "9", value: 9 },
  { label: "10", value: 10 },
]

export const CartItemsListItem = (props: CartItemsListItemProps) => {
  const { cartToItem, isLoading, onUpdateCartToItem, onDeleteCartToItem } = props

  const [selectedProductsQty, setSelectedProductsQty] = useState<OptionSelectField>(
    quantityItemsOptions.find((el) => cartToItem.qty === el.value) ?? { label: "0", value: 0 }
  )

  return (
    <li className="flex flex-row xs:flex-col md:flex-row lg:flex-col xl:flex-row gap-4 py-4">
      {cartToItem.item.images[0] && (
        <CartItemsListItemImage
          src={cartToItem.item.images[0]?.image.url}
          alt={cartToItem.item.images[0]?.image.title || cartToItem.item.title || ""}
        />
      )}

      <div className="relative flex flex-1 flex-col gap-y-2">
        <CartItemsListItemInfo cartToItem={cartToItem} />

        <div className="max-w-[200px]">
          <Select
            name={`quantity-${cartToItem.itemId}`}
            defaultValue={selectedProductsQty}
            selected={selectedProductsQty}
            options={quantityItemsOptions}
            onChange={async (value: { value: number; label: string }) => {
              await onUpdateCartToItem({ id: cartToItem.id, qty: value.value })
              setSelectedProductsQty(value)
            }}
            disabled={isLoading}
          />
        </div>

        <div className="absolute right-0 top-0">
          <ButtonCircular
            variant={"soft"}
            size={"xs"}
            icon={<XMarkIcon className="h-5 w-5" aria-hidden="true" />}
            onClick={async () => onDeleteCartToItem(cartToItem.id)}
            disabled={isLoading}
          />
        </div>

        {/*
        // TODO: add func status
        <div>
          <p className="mt-4 flex space-x-2 text-sm text-gray-700">
            {cartToItem.item.status === "HIDDEN" ? (
              <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
            ) : (
              <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
            )}

            <span>{cartToItem.item.status}</span>
          </p>
        </div>
        */}
      </div>
    </li>
  )
}

export default CartItemsListItem

/*
<div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">



        </div>


*/
