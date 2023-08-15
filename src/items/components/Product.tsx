import { Category, Image, ImageToItem, Item, Price, Prisma, Review, User } from "db"

import { ProductImages } from "src/items/components/ProductImages"
import { ProductVariant } from "src/items/components/ProductVariant"
import { ProductReviews } from "src/items/components/ProductReviews"
import { ProductDetails } from "src/items/components/ProductDetails"
import { ProductPolicies } from "src/items/components/ProductPolicies"

interface ProductProps {
  item: Item & {
    amount: Price
    category: Category | null
    _count: Prisma.ItemCountOutputType
    coverImage: ImageToItem & {
      image: Image
    }
    images: (ImageToItem & {
      image: Image
    })[]
    reviews: (Review & {
      sender: User
    })[]
  }
}

export const Product = (props: ProductProps) => {
  const { item } = props

  return (
    <div className="bg-white">
      <div className="pb-16 pt-6 sm:pb-24">
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <ProductVariant item={item} />
              <ProductReviews item={item} />
            </div>

            <ProductImages
              coverImage={item.coverImage}
              // TODO: add images in seed
              // images={item.images}
              images={[item.coverImage, item.coverImage, item.coverImage]}
            />

            <div className="mt-8 lg:col-span-5">
              <form>
                {
                  // TODO: create in src/core/components/buttons/ButtonMain
                }
                <button
                  // type="submit"
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to cart
                </button>
              </form>

              <ProductDetails item={item} />

              <ProductPolicies />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
