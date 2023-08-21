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

  return <Home offers={offers} />
}

export default HomeController
