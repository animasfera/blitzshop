import { useMutation, usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { ListOrNotFoundMessage } from "src/core/components/ListOrNotFoundMessage"
import { usePagination } from "src/core/hooks/usePagination"
import { Modal } from "src/core/tailwind-ui/overlays/Modal"
import getItems from "src/items/queries/getItems"
import AdminItemCard from "./AdminItemCard"
import AdminItemsControllerHeader from "./AdminItemsControllerHeader"
import { IAdminItem } from "./AdminItem"
import AdminItemsList from "./AdminItemsList"
import { AdminItemForm } from "./AdminItemForm"
import updateItem from "src/items/mutations/updateItem"

const ITEMS_PER_PAGE = 10

const AdminItemsController = () => {
  const router = useRouter()

  const pagination = usePagination()
  const [{ items, hasMore, count }] = usePaginatedQuery(getItems, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * pagination.page,
    take: ITEMS_PER_PAGE,
  })
  const [updateItemMutation] = useMutation(updateItem)
  const [currentItem, setCurrentItem] = useState<IAdminItem["item"]>(null)
  const [showItemCard, setShowItemCard] = useState<boolean>(false)
  const [showItemForm, setShowItemForm] = useState<boolean>(false)

  return (
    <>
      <Modal
        size="flex w-full transform  text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl"
        isOpen={showItemForm}
        onClose={() => setShowItemForm(false)}
        bottomClose={false}
      >
        <AdminItemForm
          item={currentItem}
          submitText="Сохранить"
          initialValues={currentItem ? { ...currentItem } : {}}
          onSubmit={(data) => {
            updateItemMutation({ id: currentItem?.id, ...data })
          }}
        />
      </Modal>
      <Modal size="lg:w-1/2 sm:w-5/6" isOpen={showItemCard} onClose={() => setShowItemCard(false)}>
        <AdminItemCard
          item={currentItem}
          onEditClick={(item) => {
            setCurrentItem(item)
            setShowItemForm(true)
          }}
        />
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
          onEditClick={(item) => {
            setCurrentItem(item)
            setShowItemForm(true)
          }}
        />
      </ListOrNotFoundMessage>
    </>
  )
}

export default AdminItemsController
