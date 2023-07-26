import { Badge, ChakraProps } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

export const StatusColors = {
  canceled: "red",
  blocked: "red",
  failed: "red",
  pending: "gray",
  suspended: "orange",
  rejected: "red",
  approved: "orange",
  paying: "green",
  paid: "green",
  active: "green",
  inactive: "red",
  on: "green",
  off: "red",
  finished: "green",
  uploaded: "green",
}

export const StatusBadge = (props: ChakraProps & { status: string }) => {
  const { status, ...rest } = props
  const { t } = useTranslation(["translation"])
  const labelTranslated = t("statuses." + status)
  return (
    <Badge {...rest} colorScheme={StatusColors[status]}>
      {labelTranslated}
    </Badge>
  )
}
