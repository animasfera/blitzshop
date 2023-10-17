import React from "react"
import { Button, Heading } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { LocaleEnum } from "@prisma/client"

export const SettingsController = () => {
  const { i18n } = useTranslation(["components"])

  return (
    <>
      <Heading></Heading>
      <Button
        px={0}
        onClick={() => {
          i18n.changeLanguage(LocalEnum.en)
        }}
        bg={"none"}
        style={{ fontWeight: i18n.resolvedLanguage === "en" ? "bold" : "normal" }}
      >
        En
      </Button>
      <Button
        px={0}
        ml={1}
        onClick={() => {
          i18n.changeLanguage(LocalEnum.ru)
        }}
        bg={"none"}
        style={{ fontWeight: i18n.resolvedLanguage === "ru" ? "bold" : "normal" }}
      >
        Ru
      </Button>
    </>
  )
}
