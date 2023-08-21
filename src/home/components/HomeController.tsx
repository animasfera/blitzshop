import React from "react"
import { useQuery } from "@blitzjs/rpc"
import { useTranslation } from "react-i18next"

import { Home } from "src/home/components/Home"
import getItems from "src/items/queries/getItems"
import getCategories from "src/categories/queries/getCategories"

const ITEMS_PER_PAGE = 100

export const HomeController = () => {
  // const [category] = useQuery(getCategory, { id: categoryId })
  /*
  const [{ categories }] = useQuery(getCategories, {
    // where: { category: { titleRu: "Напольные игровые поля" } },
  })

  console.log("categories", categories)
  */

  /*
  const [{ chatRooms }] = useQuery(getChatRooms, {
    where: { users: { some: { userId } }, type },
    orderBy: { updatedAt: "desc" },
  })
  */

  /*
  const [{ items }] = useQuery(getItems, {
    skip: ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,

    where: {
      // categoryId: 2,
      category: { id: 1 },
      // category: { titleRu: "Напольные игровые поля"}
    },
  })
  */

  // console.log("items", items)

  const { t } = useTranslation(["pages.home"])

  const offers = [
    { name: t("offers.download.name"), value: t("offers.download.value"), href: "#" },
    { name: t("offers.return.name"), value: t("offers.return.value"), href: "#" },
    { name: t("offers.newsletter.name"), value: t("offers.newsletter.value"), href: "#" },
  ]

  return (
    <Home
      offers={offers}
      //  items={items}
    />
  )
}

export default HomeController
