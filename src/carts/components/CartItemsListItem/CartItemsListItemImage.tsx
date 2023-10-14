import Image from "next/image"

interface CartItemsListItemImageProps {
  src: string
  alt: string
}

export const CartItemsListItemImage = (props: CartItemsListItemImageProps) => {
  const { src, alt } = props

  return (
    <div className="flex-shrink-0">
      <Image
        width={200}
        height={200}
        src={src}
        alt={alt}
        className="h-36 w-full rounded-md object-cover object-center sm:w-36 sm:h-36 md:w-48 md:h-48 lg:h-42 lg:w-full xl:w-48"
      />
    </div>
  )
}

export default CartItemsListItemImage
