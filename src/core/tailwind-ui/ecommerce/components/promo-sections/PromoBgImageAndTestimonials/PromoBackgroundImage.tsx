import React from "react"
import Image from "next/image"

interface PromoBackgroundImageProps {
  bgImage: {
    src: string
    alt?: string
  }
}

export const PromoBackgroundImage = (props: PromoBackgroundImageProps) => {
  const { bgImage } = props

  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="absolute inset-0 mx-auto max-w-7xl overflow-hidden xl:px-8">
        <Image
          src={bgImage.src}
          alt={bgImage.alt ?? ""}
          width={200}
          height={200}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-white bg-opacity-75" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white" />
    </div>
  )
}

export default PromoBackgroundImage
