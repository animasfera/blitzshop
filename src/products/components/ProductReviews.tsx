import { Item, Review, User } from "db"
import { StarIcon } from "@heroicons/react/20/solid"

import { classNames } from "src/core/helpers/classNames"

interface ProductReviewsProps {
  item: Item & { reviews: (Review & { sender: User })[] }
}

export const ProductReviews = (props: ProductReviewsProps) => {
  const { item } = props

  return (
    <div className="mt-4">
      <h2 className="sr-only">Reviews</h2>
      <div className="flex items-center">
        <p className="text-sm text-gray-700 m-0">
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
        {item.reviews.length > 0 && (
          <div className="ml-4 flex">
            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              See all {item.reviews.length} reviews
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductReviews
