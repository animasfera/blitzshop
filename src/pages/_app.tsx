import React from "react"
import { useState, useEffect, useRef, startTransition, Suspense } from "react"
import { useRouter } from "next/router"
import { AuthenticationError, AuthorizationError } from "blitz"
import { ErrorFallbackProps, ErrorBoundary, AppProps, Routes } from "@blitzjs/next"
import { useTranslation } from "react-i18next"
import { CurrencyEnum } from "db"
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar"
import ReactGA from "react-ga4"

import "src/core/styles/index.css"

import { withBlitz } from "src/blitz-client"

import { LightModeContext } from "src/core/contexts/lightModeContext"
import { Currency, CurrencyContext } from "src/core/contexts/currencyContext"
import { TimezoneContext } from "src/core/contexts/timezoneContext"
import { ThemeEnum } from "src/core/enums/ThemeEnum"
import { Layout } from "src/core/layouts/Layout"
import { Loading } from "src/core/components/Loading"
import { TimezoneWatch } from "src/core/components/TimezoneWatch"
import { useQueryErrorResetBoundary } from "@blitzjs/rpc"
import { HeaderController } from "src/core/components/sections/Header/HeaderController"
import Footer from "../core/components/sections/Footer"
import { ErrorSection } from "src/core/components/sections/Error/ErrorSection"
import LoginForm from "../auth/components/LoginForm"
import SignupForm from "../auth/components/SignupForm"
import AuthContainer from "src/auth/components/AuthContainer"

ReactGA.initialize("G-34Y9N908L5")

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const { t } = useTranslation(["pages.errors", "pages.login", "pages.signup"])
  const [authForm, setAuthForm] = useState("login")
  const isLogin = authForm === "login"
  let CertainAuthForm = isLogin ? LoginForm : SignupForm

  if (error instanceof AuthenticationError) {
    return (
      <Suspense fallback={<>"Loading..."</>}>
        <AuthContainer
          title={isLogin ? t("pages.login:title") : t("pages.signup:title")}
          link={{
            message: isLogin
              ? t("pages.login:loginForm.texts.noAccount")
              : t("pages.signup:signupForm.texts.haveAccount"),
            href: authForm === "login" ? Routes.SignupPage().href : Routes.LoginPage().href,
            text: isLogin
              ? t("pages.login:loginForm.links.register")
              : t("pages.signup:signupForm.links.enter"),
          }}
        >
          <CertainAuthForm
            onSuccess={resetErrorBoundary}
            onNavigate={(link) => setAuthForm(link)}
          />
        </AuthContainer>
      </Suspense>
    )
  } else if (error instanceof AuthorizationError) {
    return (
      <Layout title={`${error.statusCode}: ${t("pages.errors:authorized.header.title")}`}>
        <Loading>
          <ErrorSection
            header={{
              statusCode: error.statusCode,
              title: t("pages.errors:authorized.header.title"),
              message: t("pages.errors:authorized.header.message"),
            }}
            link={{ href: Routes.LoginPage().href, text: t("pages.errors:main.links.signin") }}
          />
        </Loading>
      </Layout>
    )
  } else {
    const statusCode = (error as any)?.statusCode || 400
    return (
      <Layout title={`${statusCode}: ${error.name}`}>
        <Loading>
          <ErrorSection
            header={{
              statusCode,
              title: error.name,
              message: error.message,
            }}
          />
        </Loading>
      </Layout>
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
