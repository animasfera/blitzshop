import { useState, useEffect, useRef, startTransition, Suspense } from "react"
import { useRouter } from "next/router"
import { AuthenticationError, AuthorizationError } from "blitz"
import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
// import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { CurrencyEnum } from "db"
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar"
import ReactGA from "react-ga4"

import "src/core/styles/index.css"

import { withBlitz } from "src/blitz-client"

import { LightModeContext } from "src/core/contexts/lightModeContext"
import { Currency, CurrencyContext } from "src/core/contexts/currencyContext"
import { TimezoneContext } from "src/core/contexts/timezoneContext"
import { ThemeEnum } from "src/core/enums/ThemeEnum"
import { Loading } from "src/core/components/Loading"
import { TimezoneWatch } from "src/core/components/TimezoneWatch"
import { useQueryErrorResetBoundary } from "@blitzjs/rpc"
import { HeaderController } from "src/core/components/sections/Header/HeaderController"
import Footer from "../core/components/sections/Footer"
import LoginForm from "../auth/components/LoginForm"
import SignupForm from "../auth/components/SignupForm"

ReactGA.initialize("G-34Y9N908L5")

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const [authForm, setAuthForm] = useState("login")
  let CertainAuthForm = authForm === "login" ? LoginForm : SignupForm

  if (error instanceof AuthenticationError) {
    return (
      // <Loading>
      <Suspense fallback={<>"Loading..."</>}>
        <CertainAuthForm onSuccess={resetErrorBoundary} onNavigate={(link) => setAuthForm(link)} />
      </Suspense>
    )
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
  const ref = useRef(null)
  const router = useRouter()

  // const theme = extendTheme(Theme)

  const getLayout = Component.getLayout || ((page) => page)

  const handleRouteChange = (url) => {
    const loadingBar = ref.current! as LoadingBarRef
    loadingBar.complete()
    ReactGA.send({ hitType: "pageview", page: url })
  }
  const handleRouteStart = (url) => {
    const loadingBar = ref.current! as LoadingBarRef
    loadingBar.continuousStart(10, 100)
  }

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

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteStart)
    router.events.on("routeChangeComplete", handleRouteChange)
    router.events.on("hashChangeComplete", handleRouteChange)
    router.events.on("routeChangeError", handleRouteChange)

    return () => {
      router.events.off("routeChangeStart", handleRouteStart)
      router.events.off("routeChangeComplete", handleRouteChange)
      router.events.off("hashChangeComplete", handleRouteChange)
      router.events.off("routeChangeError", handleRouteChange)
    }
  }, [router.events])

  return (
    <LightModeContext.Provider value={{ mode, setMode }}>
      <CurrencyContext.Provider value={{ currency, setCurrency }}>
        <TimezoneContext.Provider value={{ timezone, setTimezone }}>
          <Loading fallback={<></>}>
            <TimezoneWatch />
          </Loading>

          <ErrorBoundary
            FallbackComponent={RootErrorFallback}
            onReset={useQueryErrorResetBoundary().reset}
          >
            <Suspense>
              <HeaderController path={router.pathname} />
            </Suspense>
          </ErrorBoundary>

          <LoadingBar
            color={"rgba(85,60,154,.8)"}
            // progress={progress}
            // onLoaderFinished={() => setProgress(0)}
            height={3}
            ref={ref}
          />

          <ErrorBoundary FallbackComponent={RootErrorFallback}>
            {getLayout(<Component {...pageProps} />)}
          </ErrorBoundary>

          <ErrorBoundary
            FallbackComponent={RootErrorFallback}
            onReset={useQueryErrorResetBoundary().reset}
          >
            <Suspense>
              <Footer path={router.pathname} />
            </Suspense>
          </ErrorBoundary>
        </TimezoneContext.Provider>
      </CurrencyContext.Provider>
      {/* </ChakraProvider> */}
    </LightModeContext.Provider>
  )
}

export default withBlitz(MyApp)
