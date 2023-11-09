import Image from "next/image"
import { Image as ImageDb, ImageToItem } from "db"

interface ItemImagesProps {
  coverImage?: ImageToItem & { image: ImageDb }
  images: (ImageToItem & { image: ImageDb })[]
}

export const ItemImages = (props: ItemImagesProps) => {
  const { coverImage, images } = props

  return (
    <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
      <h2 className="sr-only">Images</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
        {/* Cover image */}
        {coverImage && (
          <Image
            src={coverImage.image.url}
            alt={coverImage.image.title || ""}
            width={800}
            height={500}
            className={"lg:col-span-2 lg:row-span-2 rounded-lg"}
          />
        )}

        {/* Other images */}
        {images &&
          images.length > 0 &&
          images?.map((image) => (
            <Image
              key={`${image.id}-${image.imageId}`}
              src={image.image.url}
              alt={image.image.title || ""}
              width={800}
              height={500}
              className={"hidden lg:block rounded-lg"}
            />
          ))}
      </div>
    </div>
  )
}

export default ItemImages
