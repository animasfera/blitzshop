import { IAdminItem } from "./AdminItem"
import { StarIcon } from "@heroicons/react/20/solid"
import { classNames } from "src/core/helpers/classNames"
import Button from "src/core/tailwind-ui/application-ui/elements/buttons/Button"
interface IAdminItemCard {
  item: IAdminItem["item"]
  onEditClick?: (item: IAdminItem["item"]) => void
}

const AdminItemCard = (props: IAdminItemCard) => {
  const { item, onEditClick } = props
  return (
    <>
      {item && (
        <div className="bg-white">
          <div className="pb-4 pt-6 sm:pb-24">
            <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
                <div className="lg:col-span-5 lg:col-start-8">
                  <p className="text-sm font-medium text-gray-400">{item.category?.titleRu}</p>
                  <div className="flex justify-between">
                    <h1 className="text-xl font-medium text-gray-900">{item.title}</h1>
                  </div>

                  <div className="text-left">
                    <p className="text-base font-medium text-gray-600">
                      Цена: {item.amount.amount / 100}
                    </p>
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
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-400">Остаток: {item.qty}</p>
                      <p className="text-sm font-medium text-gray-400">Color: {item.color}</p>
                      <p className="text-sm font-medium text-gray-400">
                        Вес: {item.weight / 1000} кг
                      </p>
                      <p className="text-sm font-medium text-gray-400">Статус: {item.status}</p>
                      <p className="text-sm font-medium text-gray-400">Access: {item.access}</p>
                    </div>
                  </div>
                </div>

                {/* Image gallery */}
                <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                  <h2 className="sr-only">Images</h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 lg:gap-8">
                    <img
                      src={item.coverImage?.image.url}
                      alt={item.title}
                      className={"lg:col-span-2 lg:row-span-2"}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <h2 className="text-sm font-medium text-gray-900">Описание</h2>
                <div
                  className="prose prose-sm mt-4 text-gray-500"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </div>
            </div>
            {onEditClick && (
              <div className="flex justify-start">
                <Button buttonText="Edit" handleClick={() => onEditClick(item)} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default AdminItemCard
