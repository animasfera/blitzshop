import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { ListOrNotFoundMessage } from "src/core/components/ListOrNotFoundMessage"
import { usePagination } from "src/core/hooks/usePagination"
import { Modal } from "src/core/tailwind-ui/overlays/Modal"
import getItems from "src/items/queries/getItems"
import AdminItemCard from "./AdminItemCard"
import AdminItemsControllerHeader from "./AdminItemsControllerHeader"
import { IAdminItemsItem } from "./AdminItemsItem"
import AdminItemsList from "./AdminItemsList"

const ITEMS_PER_PAGE = 10

const AdminItemsController = () => {
  const router = useRouter()

  const pagination = usePagination()
  const [{ items, hasMore, count }] = usePaginatedQuery(getItems, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * pagination.page,
    take: ITEMS_PER_PAGE,
  })
  const [currentItem, setCurrentItem] = useState<IAdminItemsItem["item"]>(null)
  const [showItemCard, setShowItemCard] = useState<boolean>(false)

  return (
    <>
      <Modal size="w-1/2" isOpen={showItemCard} onClose={() => setShowItemCard(false)}>
        <AdminItemCard item={currentItem} />
      </Modal>
      <AdminItemsControllerHeader />
      <ListOrNotFoundMessage
        countObjects={count}
        itemsPerPage={ITEMS_PER_PAGE}
        pagination={pagination}
        hasMore={hasMore}
      >
        <AdminItemsList
          items={items}
          onItemClick={(item) => {
            setCurrentItem(item)
            setShowItemCard(true)
          }}
        />
      </ListOrNotFoundMessage>
    </>
  )
}

export default AdminItemsController
