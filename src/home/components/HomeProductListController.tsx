import React from "react"
import { useQuery } from "@blitzjs/rpc"
import { useTranslation } from "react-i18next"
import { LocaleEnum } from "db"

import { ProductListHorizontalScroll } from "src/core/tailwind-ui/ecommerce/components/product-lists/ProductListHorizontalScroll/ProductListHorizontalScroll"
import { ProductList } from "src/core/tailwind-ui/ecommerce/components/product-lists/ProductList/ProductList"

import getItems from "src/items/queries/getItems"
import getCategory from "src/categories/queries/getCategory"

interface HomeProductListControllerProps {
  categoryTitle: string
  classSection?: string
  link?: { text: string; url: string }
  scroll?: boolean
}

export const HomeProductListController = (props: HomeProductListControllerProps) => {
  const { categoryTitle, classSection = "", link, scroll = false } = props

  const [category] = useQuery(getCategory, { title: categoryTitle })

  const [{ items }] = useQuery(getItems, {
    take: 4,
    where: { category: { id: category.id } },
  })

  const { i18n } = useTranslation(["pages.home"])

  if (items.length > 0)
    return (
      <section className={classSection}>
        {scroll ? (
          <ProductListHorizontalScroll
            title={i18n.resolvedLanguage === LocaleEnum.ru ? category.titleRu : category.titleEn}
            // TODO: Router
            link={link}
            items={items}
          />
        ) : (
          <ProductList
            title={i18n.resolvedLanguage === LocaleEnum.ru ? category.titleRu : category.titleEn}
            link={link}
            items={items}
          />
        )}
      </section>
    )

  return <></>
}

export default HomeProductListController
