"use client"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { CurrencyEnum } from "db"

import { Loading } from "src/core/components/Loading"
import { Header } from "src/core/components/sections/Header/Header"
import { HeaderMobileMenu } from "src/core/components/sections/Header/HeaderMobileMenu"
import { CurrenciesArray } from "src/core/enums/CurrenciesEnum"
import { useCurrentUser } from "src/core/hooks/useCurrentUser"
import { useCurrency } from "src/core/hooks/useCurrency"

export interface CurrencyOption {
  label: CurrencyEnum
  value: CurrencyEnum
  img?: string
}

export const HeaderController = () => {
  const currencies: CurrencyOption[] = CurrenciesArray.map(({ name, flag }) => ({
    label: name,
    value: name,
    img: flag,
  }))

  const { t } = useTranslation(["translation"])
  const currentUser = useCurrentUser()
  const { currency, setCurrency } = useCurrency()
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption | undefined>(
    currencies.find(({ value }) => currency.name === value)
  )

  const [openMenu, setOpenMenu] = useState(false)

  const handleOpenMenu = (value: boolean) => setOpenMenu(value)

  const handleChangeCurrency = (value: CurrencyOption) => {
    setCurrency({ name: value.value, rate: 1 })
    setSelectedCurrency(value)
  }

  const navigation = [
    { name: t("translation:menu.products"), href: "/products" },
    { name: t("translation:menu.shipping"), href: "/shipping" },
    { name: t("translation:menu.contacts"), href: "/contacts" },
  ]

  return (
    <Loading>
      <>
        <HeaderMobileMenu open={openMenu} navigation={navigation} handleOpen={handleOpenMenu} />

        <Header
          openMenu={openMenu}
          navigation={navigation}
          currency={selectedCurrency}
          currencies={currencies}
          handleOpenMenu={handleOpenMenu}
          handleChangeCurrency={handleChangeCurrency}
        />
      </>
    </Loading>
  )
}

export default HeaderController
