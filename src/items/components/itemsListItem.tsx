import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { ImageToItem, Image, Item, Price, CartToItem, Cart } from "db"

import { Button } from "src/core/tailwind-ui/application-ui/elements/buttons/Button"
import { ItemsListItemImage } from "src/items/components/ItemsListItemImage"
import { ItemsListItemInfo } from "src/items/components/ItemsListItemInfo"

interface ItemsListItemProps {
  item: Item & { amount: Price; coverImage: ImageToItem & { image: Image } }
  cart: (Cart & { cartToItems: CartToItem[] }) | null
  isLoading: boolean

  handleClick: (item: Item & { amount: Price }) => Promise<void>
}

export const ItemsListItem = (props: ItemsListItemProps) => {
  const { item, cart, isLoading, handleClick } = props

  const { t } = useTranslation(["pages.products"])

  const isExistItemId = cart ? cart.cartToItems.some((el) => el.itemId === item.id) : false

  return (
    <li className="relative flex flex-col gap-2 justify-between">
      <Link href={Routes.ProductPage({ itemId: item.id })} className={"flex flex-col gap-2"}>
        <ItemsListItemImage image={item.coverImage.image} />
        <ItemsListItemInfo item={item} />
      </Link>

      <Button
        buttonText={isExistItemId ? t("buttons.remove") : t("buttons.add")}
        variant={isExistItemId ? "soft" : "primary"}
        styles={"w-full justify-center"}
        disabled={isLoading}
        handleClick={async () => {
          await handleClick(item)
        }}
      />
    </li>
  )
}

export default ItemsListItem
