import { IAdminItem } from "./AdminItem"
import { StarIcon } from "@heroicons/react/20/solid"
import { classNames } from "src/core/helpers/classNames"
interface IAdminItemCard {
  item: IAdminItem["item"]
}

const AdminItemCard = (props: IAdminItemCard) => {
  const { item } = props
  return (
    <>
      {item && (
        <div className="bg-white">
          <div className="pb-16 pt-6 sm:pb-24">
            <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
                <div className="lg:col-span-5 lg:col-start-8">
                  <div className="flex justify-between">
                    <h1 className="text-xl font-medium text-gray-900">{item.title}</h1>
                    <p className="text-xl font-medium text-gray-900">{item.amount.amount / 100}</p>
                  </div>
                  {/* Reviews */}
                  <div className="mt-4">
                    <h2 className="sr-only">Отзывы</h2>
                    <div className="flex items-center">
                      <p className="text-sm text-gray-700">
                        {item.rating}
                        <span className="sr-only"> out of 5 stars</span>
                      </p>
                      <div className="ml-1 flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              item.rating > rating ? "text-yellow-400" : "text-gray-200",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
                        ·
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image gallery */}
                <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                  <h2 className="sr-only">Images</h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                    <img
                      src={item.coverImage?.image.url}
                      alt={item.title}
                      className={"lg:col-span-2 lg:row-span-2"}
                    />
                  </div>
                </div>

                <div className="mt-8 lg:col-span-5">
                  <form>
                    {/* <button
                      type="submit"
                      className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Add to cart
                    </button> */}
                  </form>

                  {/* item details */}
                  <div className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">Description</h2>

                    <div
                      className="prose prose-sm mt-4 text-gray-500"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>

                  <div className="mt-8 border-t border-gray-200 pt-8">
                    <h2 className="text-sm font-medium text-gray-900">Fabric &amp; Care</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AdminItemCard
