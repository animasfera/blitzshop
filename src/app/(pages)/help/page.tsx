"use client"
import React from "react"
import { useTranslation } from "react-i18next"
import { Box, Heading, Text } from "@chakra-ui/react"

import HelpLayout from "src/core/layouts/HelpLayout"

const HelpPage = () => {
  const { t, i18n } = useTranslation(["pages.help"])
  return (
    <>
      <Heading>{t("headers.main")}</Heading>
      <Text>{t("texts.chooseQuestion")}</Text>
      <Text>{t("texts.notFound")}</Text>
      <Box display={"none"}></Box>
    </>
  )
}

// HelpPage.getLayout = (page) => <HelpLayout>{page}</HelpLayout>
export default HelpPage
