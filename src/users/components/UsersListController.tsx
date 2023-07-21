import { useState } from "react"
import { usePaginatedQuery } from "@blitzjs/rpc"

import { usePagination } from "src/core/hooks/usePagination"
import { ListOrNotFoundMessage } from "src/core/components/ListOrNotFoundMessage"
import getUsers from "../queries/getUsers"
import { UserFilter } from "./UserFilter"
import { UsersList } from "./UsersList"

const ITEMS_PER_PAGE = 30

export const UsersListController = () => {
  const pagination = usePagination()
  const [filter, setFilter] = useState<{ isGuide?: boolean }>({ isGuide: true })

  const [{ users, hasMore }] = usePaginatedQuery(getUsers, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * pagination.page,
    take: ITEMS_PER_PAGE,
    // where: filter,
  })
  return (
    <>
      <UserFilter
        initialValues={{ isGuideString: filter.isGuide ? "guide" : "all" }}
        // debug={true}
        _onChange={(filterFromForm) => {
          let filterCurrent = { ...filter }

          if (filterFromForm.values.isGuideString === "all") {
            if (typeof filterCurrent.isGuide !== "undefined") {
              delete filterCurrent.isGuide
            }
          } else {
            filterCurrent.isGuide = filterFromForm.values.isGuideString === "guide"
          }
          setFilter(filterCurrent)
        }}
        onSubmit={(data) => {
          // console.log(data)
        }}
      />

      <ListOrNotFoundMessage objects={users} pagination={pagination} hasMore={hasMore}>
        <UsersList users={users} />
      </ListOrNotFoundMessage>
    </>
  )
}
