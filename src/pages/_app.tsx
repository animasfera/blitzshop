import { useState, useEffect, ReactElement, Suspense } from "react"
import { AuthenticationError, AuthorizationError } from "blitz"
import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { useSession } from "@blitzjs/auth"
import { ChakraProvider, DarkMode, Box, extendTheme } from "@chakra-ui/react"
import { CurrencyEnum } from "@prisma/client"

import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/200.css"
import "@fontsource/nunito/500.css"
import "@fontsource/nunito/200.css"
import "@fontsource/raleway/400.css"
import "@fontsource/raleway/600.css"
import "@fontsource/open-sans/700.css"

import { withBlitz } from "src/blitz-client"
import "src/styles/styles.css"
import { Theme } from "src/core/theme/Theme"
import { LightModeContext } from "src/core/contexts/lightModeContext"
import { Currency, CurrencyContext } from "src/core/contexts/currencyContext"
import { TimezoneContext } from "src/core/contexts/timezoneContext"
import { ThemeEnum } from "src/core/enums/ThemeEnum"
import { Loading } from "src/core/components/Loading"
import { useTimezone } from "src/core/hooks/useTimezone"

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<ThemeEnum>(ThemeEnum.light)
  const [currency, setCurrency] = useState<Currency>({ name: CurrencyEnum.EUR, rate: 1 })
  const [timezone, setTimezone] = useState("Etc/Greenwich")

  const theme = extendTheme(Theme)

  const getLayout = Component.getLayout || ((page) => page)

  useEffect(() => {
    if (localStorage.getItem("currency")) {
      let data: any

      try {
        data = JSON.parse(localStorage.getItem("currency")!)

        if (data.name === "SGD") data.name = "EUR"
      } catch (e) {
        data = {}
      }
      setCurrency(data)
    }
  }, [])

  useEffect(() => {
    if (currency) {
      localStorage && localStorage.setItem("currency", JSON.stringify(currency))
    }
  }, [currency])

  const TimezoneWatch = (props): ReactElement => {
    return (
      <>
        <Loading>
          <TimezoneWatchController {...props} />
        </Loading>
      </>
    )
  }
  const TimezoneWatchController = (props) => {
    // const { timezone, setTimezone } = props
    const session = useSession()
    const timezoneCtx = useTimezone()
    useEffect(() => {
      timezoneCtx.setTimezone(session.timezone || "Etc/Greenwich")
    }, [session.timezone])
    return <></>
  }

  return (
    <ChakraProvider theme={theme}>
      <LightModeContext.Provider value={{ mode, setMode }}>
        <CurrencyContext.Provider value={{ currency, setCurrency }}>
          <TimezoneContext.Provider value={{ timezone, setTimezone }}>
            <Suspense fallback={<></>}>
              <TimezoneWatch timezone={timezone} setTimezone={setTimezone} />
            </Suspense>
            <ErrorBoundary FallbackComponent={RootErrorFallback}>
              {getLayout(<Component {...pageProps} />)}
            </ErrorBoundary>
          </TimezoneContext.Provider>
        </CurrencyContext.Provider>
      </LightModeContext.Provider>
    </ChakraProvider>
  )
}

export default withBlitz(MyApp)
