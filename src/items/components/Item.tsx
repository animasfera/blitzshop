import { useTranslation } from "react-i18next"
import { Category, Image, ImageToItem, Item as ItemDb, Prisma, Review, User } from "db"

import { Button } from "src/core/tailwind-ui/application-ui/elements/buttons/Button"
import { ItemImages } from "src/items/components/ItemImages"
import { ItemTitle } from "src/items/components/ItemTitle"
import { ItemPrice } from "src/items/components/ItemPrice"
// import { ItemReviews } from "src/items/components/ItemReviews"
import { ItemDetails } from "src/items/components/ItemDetails"
import { ItemPolicies } from "src/items/components/ItemPolicies"

interface ItemProps {
  item: ItemDb & {
    category: Category | null
    _count: Prisma.ItemCountOutputType
    images: (ImageToItem & {
      image: Image
    })[]
    reviews: (Review & {
      sender: User
    })[]
  }
  isLoading: boolean

  onAddProductToCart: () => Promise<void>
}

export const Item = (props: ItemProps) => {
  const { item, isLoading, onAddProductToCart } = props

  const { t } = useTranslation(["pages.products"])

  return (
    <div className="bg-white">
      <div className="pb-16 pt-6 sm:pb-24">
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <ItemTitle item={item} />
                <ItemPrice price={item.price} currency={item.currency} />
              </div>
              {
                // <ItemReviews item={item} />
              }
            </div>

            <ItemImages
              coverImage={item.images[0]}
              // TODO: add images in seed
              // images={item.images}
              images={item.images}
            />

            <div className="mt-8 lg:col-span-5">
              <Button
                type={"submit"}
                variant={"primary"}
                size={"xl"}
                buttonText={t("buttons.add")}
                disabled={isLoading}
                onClick={onAddProductToCart}
              />
              <ItemDetails item={item} />

              {/* <ItemPolicies /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
