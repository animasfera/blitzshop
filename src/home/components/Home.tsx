import React from "react"
import { useTranslation } from "react-i18next"

import { HomeProductListController } from "src/home/components/HomeProductListController"
import { DataStats } from "src/core/tailwind-ui/marketing/page-sections/stats/StatsSimple"
import PromoWithOffersAndImage from "src/core/tailwind-ui/ecommerce/components/promo-sections/PromoWithOffersAndImage/PromoWithOffersAndImage"

interface HomeProps {
  offers: DataStats[]
}

export const Home = (props: HomeProps) => {
  const { offers } = props

  const { t } = useTranslation(["pages.home"])

  return (
    <>
      <PromoWithOffersAndImage
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
        button={{ text: t("hero.button"), href: "/products" }}
        image={"https://tailwindui.com/img/ecommerce-images/home-page-02-hero-half-width.jpg"}
        offers={offers}
      />

      <HomeProductListController
        categoryTitle={"Playing fields on the floor"}
        link={{ text: t("products.link"), url: "/products" }}
        scroll
      />

      <HomeProductListController categoryTitle={"Cubes"} classSection={"bg-gray-100"} />
    </>
  )
}

export default Home
