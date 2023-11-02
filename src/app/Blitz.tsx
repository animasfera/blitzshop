"use client"
import { PropsWithChildren, startTransition, Suspense, useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { SessionContext } from "@blitzjs/auth"
import { CurrencyEnum } from "@prisma/client"

import { BlitzProvider } from "src/blitz-client"
import { ThemeEnum } from "src/core/enums/ThemeEnum"
import { LightModeContext } from "src/core/contexts/lightModeContext"
import { Currency, CurrencyContext } from "src/core/contexts/currencyContext"
import { TimezoneContext } from "src/core/contexts/timezoneContext"
import { Loading } from "src/core/components/Loading"
import { TimezoneWatch } from "src/core/components/TimezoneWatch"
import HeaderController from "src/core/components/sections/Header/HeaderController"
import Footer from "src/core/components/sections/Footer"

export const Blitz = ({ children, session }: PropsWithChildren & { session: SessionContext }) => {
  const [mode, setMode] = useState<ThemeEnum>(ThemeEnum.light)
  const [currency, setCurrency] = useState<Currency>({ name: CurrencyEnum.EUR, rate: 1 })
  const [timezone, setTimezone] = useState("Etc/Greenwich")
  const ref = useRef(null)
  const pathname = usePathname()

  // const theme = extendTheme(Theme)

  const getLayout = { children: children } || ((page) => page)

  useEffect(() => {
    startTransition(() => {
      if (localStorage.getItem("currency")) {
        let data: any

        try {
          data = JSON.parse(localStorage.getItem("currency")!)
        } catch (e) {
          data = {}
        }

        setCurrency(data)
      }
    })
  }, [])

  useEffect(() => {
    if (currency) {
      localStorage && localStorage.setItem("currency", JSON.stringify(currency))
    }
  }, [currency])
  return (
    <BlitzProvider>
      <LightModeContext.Provider value={{ mode, setMode }}>
        <CurrencyContext.Provider value={{ currency, setCurrency }}>
          <TimezoneContext.Provider value={{ timezone, setTimezone }}>
            <Loading fallback={<></>}>
              <TimezoneWatch />
            </Loading>

            <Suspense>
              <HeaderController path={pathname ? pathname : ""} />
            </Suspense>
            <Suspense>{children}</Suspense>
            <Suspense>
              <Footer path={pathname} />
            </Suspense>
          </TimezoneContext.Provider>
        </CurrencyContext.Provider>
      </LightModeContext.Provider>
    </BlitzProvider>
  )
}
