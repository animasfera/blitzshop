import { ReactElement } from "react"
import { Box } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

import { Pagination } from "src/core/components/pagination/Pagination"

type ListOrNotFoundMessageProps = {
  children: ReactElement[] | ReactElement
  countObjects: number
  itemsPerPage: number
  pagination: { page: number; setPage: (page: number) => void }
  hasMore: boolean
  notFoundMessage?: string
}

export const ListOrNotFoundMessage = (props: ListOrNotFoundMessageProps) => {
  const { children, countObjects, itemsPerPage, pagination, hasMore, notFoundMessage } = props
  const { t } = useTranslation(["translation"])

  return (
    <>
      {countObjects && countObjects > 0 ? (
        <>
          {children}
          <Pagination
            page={pagination.page}
            countObjects={countObjects}
            itemsPerPage={itemsPerPage}
            hasMore={hasMore}
            onChange={pagination.setPage}
          />
        </>
      ) : (
        <>
          <Box color={"gray.400"}>{notFoundMessage || t("notFound")}</Box>
        </>
      )}
    </>
  )
}
