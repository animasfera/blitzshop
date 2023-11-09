import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { ImageToItem, Image, Item } from "db"
import { ItemsListItemImage } from "src/items/components/ItemsListItemImage"
import { ItemsListItemInfo } from "src/items/components/ItemsListItemInfo"

interface ItemsListItemProps {
  item: Item & { images: (ImageToItem & { image: Image })[] }
  isLoading: boolean

  // handleClick: (item: Item & { amount: Price }) => Promise<void>
}

export const ItemsListItem = (props: ItemsListItemProps) => {
  const {
    item,
    isLoading,
    // handleClick
  } = props

  const { t } = useTranslation(["pages.products"])

  return (
    <li className="relative flex flex-col gap-2 justify-between">
      <Link href={Routes.ProductPage({ itemId: item.id })} className={"flex flex-col gap-2"}>
        <ItemsListItemImage image={item.images[0]?.image} />
        <ItemsListItemInfo item={item} />
      </Link>

      {/*<Button*/}
      {/*  buttonText={t("buttons.add")}*/}
      {/*  variant={"primary"}*/}
      {/*  styles={"w-full justify-center"}*/}
      {/*  disabled={isLoading}*/}
      {/*  handleClick={async () => {*/}
      {/*    await handleClick(item)*/}
      {/*  }}*/}
      {/*/>*/}
    </li>
  )
}

export default ItemsListItem
