"use client"
import { CurrencyEnum } from "@prisma/client"
import { usePathname } from "next/navigation"
import { startTransition, Suspense, useEffect, useRef, useState } from "react"
import { BlitzProvider } from "src/blitz-client"
import { Loading } from "src/core/components/Loading"
import Footer from "src/core/components/sections/Footer"
import HeaderController from "src/core/components/sections/Header/HeaderController"
import { TimezoneWatch } from "src/core/components/TimezoneWatch"
import { Currency, CurrencyContext } from "src/core/contexts/currencyContext"
import { LightModeContext } from "src/core/contexts/lightModeContext"
import { TimezoneContext } from "src/core/contexts/timezoneContext"
import { ThemeEnum } from "src/core/enums/ThemeEnum"
import "src/core/styles/index.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeEnum>(ThemeEnum.light)
  const [currency, setCurrency] = useState<Currency>({ name: CurrencyEnum.EUR, rate: 1 })
  const [timezone, setTimezone] = useState("Etc/Greenwich")
  const ref = useRef(null)
  const pathname = usePathname()

  // const theme = extendTheme(Theme)

  const getLayout = { children } || ((page) => page)

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
    <html lang="en">
      <body>
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

                {children}

                <Suspense>
                  <Footer path={pathname} />
                </Suspense>
              </TimezoneContext.Provider>
            </CurrencyContext.Provider>
          </LightModeContext.Provider>
        </BlitzProvider>
      </body>
    </html>
  )
}
