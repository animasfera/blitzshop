import React from "react"
import { AuthenticationError, AuthorizationError } from "blitz"
import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

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
  const theme = extendTheme(Theme)

  const getLayout = Component.getLayout || ((page) => page)
  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
    </ChakraProvider>
  )
}

export default withBlitz(MyApp)
