import Link from "next/link"
import { useSession } from "@blitzjs/auth"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import { Stack, Link as ChakraLink, Heading } from "@chakra-ui/react"
import React from "react"

export const HelpMenuItems = () => {
  const router = useRouter()
  const user = useSession().user
  const { t, i18n } = useTranslation(["pages.help"])
  const lang = (user && user.locale) || i18n.resolvedLanguage

  const lngPref = "/help/" + lang + "/"

  let menuItems = [
    {
      link: lngPref + "common/registration",
      label: t("menu.common.items.registration"),
    },
  ]
  let menuItemsGuides = [
    {
      link: lngPref + "guides/getting-verified",
      label: t("menu.guides.items.gettingVerified"),
    },
    {
      link: lngPref + "guides/adding-new-game",
      label: t("menu.guides.items.addingNewGame"),
    },
    {
      link: lngPref + "guides/refund-requests",
      label: t("menu.guides.items.refund"),
    },
    {
      link: lngPref + "guides/payouts",
      label: t("menu.guides.items.payouts"),
    },
    {
      link: lngPref + "guides/accreditation",
      label: t("menu.guides.items.accreditation"),
    },
    {
      link: lngPref + "guides/leela",
      label: t("menu.guides.items.leela"),
    },
    {
      link: lngPref + "guides/video",
      label: t("menu.guides.items.video"),
    },
  ]
  let menuItemsPlayers = [
    {
      link: lngPref + "players/booking-a-game",
      label: t("menu.players.items.bookingGame"),
    },
    {
      link: lngPref + "players/refund-requests",
      label: t("menu.players.items.refund"),
    },
    {
      link: lngPref + "players/leela",
      label: t("menu.guides.items.leela"),
    },
    {
      link: lngPref + "players/video",
      label: t("menu.guides.items.video"),
    },
  ]

  const defItemStyle = {
    textDecoration: "none",
    px: 3,
    py: 2,
    // rounded: 10,
    _hover: {
      textDecoration: "none",
    },
    lineHeight: "21px",
  }

  const activeItemStyle = {
    ...defItemStyle,
    bg: "gray.100",
    display: "inline",
    // textDecoration: "underline",
    color: "purple.900",
    fontWeight: "bold",
  }

  return (
    <>
      <Heading size={"sm"}>{t("menu.common.header")}</Heading>
      <Stack>
        {menuItems.map((item) => {
          const active = router.pathname === item.link
          const itemStyle = active ? activeItemStyle : defItemStyle
          return (
            <Link key={item.label} href={item.link} passHref>
              <ChakraLink {...itemStyle}>{item.label}</ChakraLink>
            </Link>
          )
        })}
      </Stack>

      <Heading size={"sm"} mt={12}>
        {t("menu.players.header")}
      </Heading>
      <Stack>
        {menuItemsPlayers.map((item) => {
          const active = router.pathname === item.link
          const itemStyle = active ? activeItemStyle : defItemStyle
          return (
            <Link key={item.label} href={item.link} passHref>
              <ChakraLink {...itemStyle}>{item.label}</ChakraLink>
            </Link>
          )
        })}
      </Stack>

      <Heading size={"sm"} mt={12}>
        {t("menu.guides.header")}
      </Heading>
      <Stack>
        {menuItemsGuides.map((item) => {
          const active = router.pathname === item.link
          const itemStyle = active ? activeItemStyle : defItemStyle
          return (
            <Link key={item.label} href={item.link} passHref>
              <ChakraLink {...itemStyle}>{item.label}</ChakraLink>
            </Link>
          )
        })}
      </Stack>
    </>
  )
}
