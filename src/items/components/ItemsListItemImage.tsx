import Image from "next/image"
import { Image as ImageDb } from "db"

interface ItemsListItemImageProps {
  image?: ImageDb
}

export const ItemsListItemImage = (props: ItemsListItemImageProps) => {
  const { image } = props

  return (
    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
      {image && (
        <Image
          src={image.url}
          alt={image.title || ""}
          width={800}
          height={500}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      )}
    </div>
  )
}
