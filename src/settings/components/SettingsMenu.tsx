import Link from "next/link"
import { useSession } from "@blitzjs/auth"
import { useRouter } from "next/router"
import { Stack, Link as ChakraLink, Box, Flex } from "@chakra-ui/react"
import React, { ReactElement } from "react"
import { useTranslation } from "react-i18next"

const SettingsMenuItems = () => {
  const router = useRouter()
  const user = useSession().user
  const { t } = useTranslation(["pages.settings"])

  if (!user) {
    return <></>
  }

  let menuItems = [
    {
      link: process.env.SITE_URL || "", // Routes.SettingsPage(),
      label: t("index.menu.settings"),
    },
    {
      link: process.env.SITE_URL || "", // Routes.SettingsProfilePage(),
      label: t("index.menu.profile"),
    },
    {
      link: process.env.SITE_URL || "", // Routes.SettingsPaymentMethodsPage(),
      label: t("index.menu.paymentMethods"),
    },
    // {
    //   link: Routes.SettingsIdPage(),
    //   label: "Идентификация",
    // },
  ]

  const defItemStyle = {
    textDecoration: "none",
    px: 5,
    py: 3,
    rounded: 10,
    _hover: {
      textDecoration: "none",
    },
  }

  const activeItemStyle = {
    ...defItemStyle,
    bg: "purple.700",
    color: "white",
  }

  return (
    <Stack className={"vertical-menu"}>
      {/* {menuItems.map((item) => {
        const active = router.pathname === item.link
        const itemStyle = active ? activeItemStyle : defItemStyle
        return (
          <Link key={item.label} href={item.link} passHref>
            <ChakraLink {...itemStyle} display={"block"}>
              {item.label}
            </ChakraLink>
          </Link>
        )
      })} */}
    </Stack>
  )
}

type SettingsMenuProps = {
  children: ReactElement | ReactElement[]
}
export const SettingsMenu = (props: SettingsMenuProps) => {
  const { children } = props

  return (
    <>
      <Flex mt={6} flexDirection={["column", "row"]} width={"100%"}>
        <Box flexShrink={0} width={["100%", "200px"]}>
          <SettingsMenuItems />
        </Box>
        <Box flexGrow={1} ml={[0, 10]} mt={[10, 0]}>
          {children}
        </Box>
      </Flex>
    </>
  )
}
