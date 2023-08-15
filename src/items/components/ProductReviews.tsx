import { Item, Review, User } from "db"

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
