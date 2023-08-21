import React from "react"
import { useQuery } from "@blitzjs/rpc"
import { useTranslation } from "react-i18next"
import { LocaleEnum } from "db"

import { ProductListHorizontalScroll } from "src/core/tailwind-ui/ecommerce/components/product-lists/ProductListHorizontalScroll/ProductListHorizontalScroll"
import getItems from "src/items/queries/getItems"
import getCategory from "src/categories/queries/getCategory"

const ITEMS_PER_PAGE = 4

interface HomeProductListControllerProps {
  categoryTitle: string
  classSection?: string
  link?: { text: string; url: string }
}

export const HomeProductListController = (props: HomeProductListControllerProps) => {
  const { categoryTitle, classSection = "", link } = props

  const [category] = useQuery(getCategory, { title: categoryTitle })

  const [{ items }] = useQuery(getItems, {
    take: ITEMS_PER_PAGE,
    where: { category: { id: category.id } },
  })

  const { t, i18n } = useTranslation(["pages.home"])

  if (items.length > 0)
    return (
      <section
        className={classSection}
        aria-labelledby={
          i18n.resolvedLanguage === LocaleEnum.RU ? category.titleRu : category.titleEn
        }
      >
        <ProductListHorizontalScroll
          title={i18n.resolvedLanguage === LocaleEnum.RU ? category.titleRu : category.titleEn}
          // TODO: Router
          link={link}
          items={items}
        />
      </section>
    )

  return <></>
}

export default HomeProductListController