import Head from "next/head"
import React, { useEffect, FC } from "react"
import { BlitzLayout } from "@blitzjs/next"
import i18n from "../i18n"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  useEffect(() => {
    // @ts-ignore
    document.documentElement.lang = i18n.resolvedLanguage?.toUpperCase()
  }, [])

  return (
    <>
      <Head>
        <title>{title || "shop"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </>
  )
}

export default Layout
