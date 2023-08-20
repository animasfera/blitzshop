import React from "react"
import { useQuery } from "@blitzjs/rpc"
import { useTranslation } from "react-i18next"

import { Loading } from "src/core/components/Loading"
import { Home } from "src/home/components/Home"
import getItems from "src/items/queries/getItems"

const ITEMS_PER_PAGE = 4

export const HomeController = () => {
  const [{ items }] = useQuery(getItems, {
    skip: ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
  })

  const { t } = useTranslation(["pages.home"])

  const offers = [
    { name: t("offers.download.name"), value: t("offers.download.value"), href: "#" },
    { name: t("offers.return.name"), value: t("offers.return.value"), href: "#" },
    { name: t("offers.newsletter.name"), value: t("offers.newsletter.value"), href: "#" },
  ]

  return <Home offers={offers} items={items} />
}

export default HomeController