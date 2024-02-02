import React from "react"

import { PromoBackgroundImage } from "./PromoBackgroundImage"
import { PromoBgImageAndTestimonialsHead } from "./PromoBgImageAndTestimonialsHead"
import { PromoTestimonials } from "./PromoTestimonials"

interface PromoWithBackgroundImageAndTestimonialsProps {
  title: string
  subtitle?: string
  button?: { text: string; href: string }
  bgImage: {
    src: string
    alt?: string
  }
  titleReviews: string
  reviews: {
    id: number
    quote: string
    attribution: string
  }[]
}

export const PromoBgImageAndTestimonials = (
  props: PromoWithBackgroundImageAndTestimonialsProps
) => {
  const { title, subtitle, button, bgImage, titleReviews, reviews } = props

  return (
    <div className="relative overflow-hidden bg-white">
      {/* <PromoBackgroundImage bgImage={bgImage} /> */}

      {/* <PromoBgImageAndTestimonialsHead title={title} subtitle={subtitle} button={button} /> */}

      {/* <PromoTestimonials title={titleReviews} reviews={reviews} /> */}
    </div>
  )
}

export default PromoBgImageAndTestimonials
