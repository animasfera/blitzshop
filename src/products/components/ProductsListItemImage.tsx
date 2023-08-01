interface ProductsListItemImageProps {
  src: string
  alt: string
}

export const ProductsListItemImage = (props: ProductsListItemImageProps) => {
  const { src, alt } = props

  return (
    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
      />
    </div>
  )
}
