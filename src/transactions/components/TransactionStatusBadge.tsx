import { TransactionStatusColors } from "./TransactionEnums"
import { Badge } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

export const TransactionStatusBadge = (props) => {
  const { status } = props
  const { t } = useTranslation(["transaction"])
  const labelTranslated = t("statuses." + status)
  return <Badge colorScheme={TransactionStatusColors[status]}>{labelTranslated}</Badge>
}
