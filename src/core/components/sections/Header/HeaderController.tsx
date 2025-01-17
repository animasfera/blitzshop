import { useState } from "react"
import { useSession } from "@blitzjs/auth"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import { CurrencyEnum } from "db"

import { Loading } from "src/core/components/Loading"
import { Header } from "src/core/components/sections/Header/Header"
import { HeaderMobileMenu } from "src/core/components/sections/Header/HeaderMobileMenu"
import { CurrenciesArray } from "src/core/enums/CurrenciesEnum"
import { useCurrency } from "src/core/hooks/useCurrency"
import logout from "src/auth/mutations/logout"
import getCart from "src/carts/queries/getCart"
import { useCart } from "../../../hooks/useCart"

export interface CurrencyOption {
  label: string
  value: CurrencyEnum
  img?: string
}

interface HeaderControllerProps {
  path: string
}

export const HeaderController = (props: HeaderControllerProps) => {
  const { path } = props

  const currencies: CurrencyOption[] = CurrenciesArray.map(({ name, symbol }) => ({
    label: symbol,
    value: name,
  }))

  const { t } = useTranslation(["translation"])
  const router = useRouter()
  const session = useSession()

  const { cart, reloadCart } = useCart()
  const [logoutMutation] = useMutation(logout)

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

  const handleLogout = async () => {
    await logoutMutation()

    void router.push(Routes.ProductsPage())
  }

  const navigation = [
    { name: t("translation:menu.products"), href: Routes.ProductsPage().href },
    { name: t("translation:menu.shipping"), href: "/shipping" },
    { name: t("translation:menu.contacts"), href: Routes.ContactsPage().href },
  ]

  const userMenu = [
    { name: t("translation:userMenu.orders"), href: Routes.OrdersPage().href },
    { name: t("translation:userMenu.settings"), href: Routes.SettingsPage().href },
  ]
  const isAdminPage = path.indexOf("/admin") !== -1

  return (
    <>
      {!isAdminPage && (
        <Loading>
          <HeaderMobileMenu
            open={openMenu}
            session={session}
            navigation={navigation}
            userMenu={userMenu}
            path={path}
            handleOpen={handleOpenMenu}
            logout={handleLogout}
          />

          <Header
            openMenu={openMenu}
            session={session}
            navigation={navigation}
            userMenu={userMenu}
            currency={selectedCurrency}
            currencies={currencies}
            path={path}
            cart={cart}
            handleOpenMenu={handleOpenMenu}
            handleChangeCurrency={handleChangeCurrency}
            logout={handleLogout}
          />
        </Loading>
      )}
    </>
  )
}
export default HeaderController
