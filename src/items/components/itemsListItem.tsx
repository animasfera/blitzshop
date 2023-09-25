import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { ImageToItem, Image, Item, Price } from "db"

import { Button } from "src/core/tailwind-ui/application-ui/elements/buttons/Button"
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

  const { t } = useTranslation(["pages.products"])

  return (
    <li className="relative flex flex-col gap-2 justify-between">
      <Link href={Routes.ProductPage({ itemId: item.id })} className={"flex flex-col gap-2"}>
        <ItemsListItemImage image={item.coverImage.image} />
        <ItemsListItemInfo item={item} />
      </Link>

      <Button buttonText={t("buttons.add")} styles={"w-full justify-center"} />
    </li>
  )
}

export default ItemsListItem
