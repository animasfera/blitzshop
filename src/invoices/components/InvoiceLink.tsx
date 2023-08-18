"use client"
import Link from "next/link"
import { Link as ChakraLink } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

export const InvoiceLink = (props: {
  id: number
  withWord?: boolean
  onClick?: any
  isCreditNote?: boolean
  [key: string]: any
}) => {
  const { id, withWord, onClick, isCreditNote = false } = props

  const { t } = useTranslation(["invoice"])

  return (
    <Link href={""} passHref>
      <ChakraLink
        onClick={() => {
          onClick && onClick()
          return false
        }}
      >
        {isCreditNote ? t("creditNote") : t("invoice")} #{id}
      </ChakraLink>
    </Link>
  )
}
