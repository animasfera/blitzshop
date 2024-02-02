import React from "react"

import {
  StatsSimple,
  DataStats,
} from "src/core/tailwind-ui/marketing/page-sections/stats/StatsSimple_"
import { HeroSplitWithImage } from "src/core/tailwind-ui/marketing/page-sections/hero-sections/HeroSplitWithImage"

interface PromoWithOffersAndImageProps {
  title: string
  subtitle?: string
  button?: { text: string; href: string }
  image: string
  offers: DataStats[]
}

export const PromoWithOffersAndImage = (props: PromoWithOffersAndImageProps) => {
  const { title, subtitle, button, image, offers } = props

  return (
    <section>
      <div className="flex flex-col">
        <div className="order-last lg:order-first">
          <StatsSimple data={offers} />
        </div>

        <HeroSplitWithImage title={title} subtitle={subtitle} button={button} image={image} />
      </div>
    </section>
  )
}

export default PromoWithOffersAndImage
