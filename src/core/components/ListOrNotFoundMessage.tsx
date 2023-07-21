import { ReactElement } from "react"
import { Box } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

import Pagination from "./Pagination"

type ListOrNotFoundMessageProps = {
  children: ReactElement[] | ReactElement
  objects: any[]
  pagination: { page: number; setPage: (page: number) => void }
  hasMore: boolean
  notFoundMessage?: string
}

export const ListOrNotFoundMessage = (props: ListOrNotFoundMessageProps) => {
  const { children, objects, pagination, hasMore, notFoundMessage } = props
  const { t } = useTranslation(["translation"])
  return (
    <>
      {objects && objects.length && objects.length > 0 ? (
        <>
          {children}
          <Pagination page={pagination.page} hasMore={hasMore} onChange={pagination.setPage} />
        </>
      ) : (
        <>
          <Box color={"gray.400"}>{notFoundMessage || t("notFound")}</Box>
        </>
      )}
    </>
  )
}
