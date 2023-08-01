import { Image } from "db"

interface ProductsListItemImageProps {
  image: Image
}

export const ProductsListItemImage = (props: ProductsListItemImageProps) => {
  const { image } = props

  return (
    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
      <img
        src={image.url}
        alt={image.title || ""}
        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
      />
    </div>
  )
}
