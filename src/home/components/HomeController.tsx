"use client"
import React from "react"
import { useTranslation } from "react-i18next"

import { Home } from "src/home/components/Home"

export const HomeController = () => {
  const { t } = useTranslation(["pages.home"])

  const offers = [
    { name: t("offers.download.name"), value: t("offers.download.value"), href: "#" },
    { name: t("offers.return.name"), value: t("offers.return.value"), href: "#" },
    { name: t("offers.newsletter.name"), value: t("offers.newsletter.value"), href: "#" },
  ]

  const testimonials = [
    {
      id: 1,
      quote:
        "My order arrived super quickly. The product is even better than I hoped it would be. Very happy customer over here!",
      attribution: "Sarah Peters, New Orleans",
    },
    {
      id: 2,
      quote:
        "I had to return a purchase that didn’t fit. The whole process was so simple that I ended up ordering two new items!",
      attribution: "Kelly McPherson, Chicago",
    },
    {
      id: 3,
      quote:
        "Now that I’m on holiday for the summer, I’ll probably order a few more shirts. It’s just so convenient, and I know the quality will always be there.",
      attribution: "Chris Paul, Phoenix",
    },
  ]

  return <Home offers={offers} reviews={testimonials} />
}

export default HomeController
