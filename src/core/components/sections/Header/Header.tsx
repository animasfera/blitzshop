import { ClientSession } from "@blitzjs/auth"
import { Bars3Icon, ShoppingBagIcon } from "@heroicons/react/24/outline"

import { OptionSelectField } from "src/core/tailwind-ui/application-ui/forms/Select"
import { ButtonCircular } from "src/core/tailwind-ui/application-ui/elements/buttons/ButtonCircular"
import { SelectSubmit } from "src/core/tailwind-ui/application-ui/forms/SelectSubmit"
import { HeaderNavigation } from "src/core/components/sections/Header/HeaderNavigation"
import { HeaderLogo } from "src/core/components/sections/Header/HeaderLogo"
import { HeaderAuth } from "src/core/components/sections/Header/HeaderAuth"
import { HeaderAvatar } from "src/core/components/sections/Header/HeaderAvatar"
import { CurrencyOption } from "src/core/components/sections/Header/HeaderController"

interface HeaderProps {
  openMenu: boolean
  session: ClientSession
  navigation: { name: string; href: string }[]
  userMenu: { name: string; href: string }[]
  currency: CurrencyOption | undefined
  currencies: CurrencyOption[]
  path: string

  handleOpenMenu: (value: boolean) => void
  handleChangeCurrency?: (values: OptionSelectField) => void
  logout: () => Promise<void>
}

export const Header = (props: HeaderProps) => {
  const {
    openMenu,
    session,
    navigation,
    userMenu,
    currency,
    currencies,
    path,

    handleOpenMenu,
    handleChangeCurrency,
    logout,
  } = props

  return (
    <header className="relative bg-white">
      <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <div className="flex h-16 items-center">
            <div className="h-full flex flex-row items-center gap-x-4">
              <ButtonCircular
                variant={"soft"}
                icon={<Bars3Icon className="h-6 w-6" aria-hidden="true" />}
                handleClick={() => handleOpenMenu(!openMenu)}
                className={"bg-white xl:hidden"}
              />

              <div className="flex">
                <HeaderLogo />
              </div>

              <HeaderNavigation navigation={navigation} path={path} />
            </div>

            <div className="ml-auto flex items-center gap-x-4">
              {/* <div className="hidden md:block">СМЕНА ЯЗЫКА</div> */}
              <SelectSubmit
                name="currency"
                options={currencies}
                selected={currency}
                handleChange={handleChangeCurrency}
                outerProps={{ className: "m-0" }}
              />

              {
                // Cart
              }
              <div className="flow-root">
                <a href="#" className="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    0
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </a>
              </div>

              {session?.user ? (
                <HeaderAvatar path={path} session={session} navigation={userMenu} logout={logout} />
              ) : (
                <HeaderAuth path={path} />
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
