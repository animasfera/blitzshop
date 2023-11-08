import Head from "next/head"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { FORM_ERROR } from "final-form"
import updateItem from "src/items/mutations/updateItem"
import getItem from "src/items/queries/getItem"
import { AdminItemForm } from "./AdminItemForm"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { SortableGalleryWithDropzone } from "./SortableGalleryWithDropzone"
import deleteImage from "src/images/mutations/deleteImage"

interface AdminEditItemControllerProps {
  id: number | undefined
}

const AdminEditItemController = (props: AdminEditItemControllerProps) => {
  const { id } = props
  const [item, { setQueryData, refetch }] = useQuery(getItem, { id: id })
  const [updateItemMutation] = useMutation(updateItem)
  const [deleteImageMutation] = useMutation(deleteImage)

  const handleUpload = async (image) => {
    await updateItemMutation({
      id: item.id,
      images: {
        create: { image: { create: { url: image.src } }, order: item.images.length + 1 },
      },
    })
    void refetch()
  }

  const handleSort = async (items) => {
    await Promise.all([
      setQueryData((oldData: any) => ({ ...oldData, images: items }), { refetch: false }),
      Promise.all(
        items.map((image, index) =>
          updateItemMutation({
            id: item.id,
            images: { update: { where: { id: image.id }, data: { order: index + 1 } } },
          })
        )
      ),
    ])
    void refetch()
  }

  const handleDelete = async (items, index) => {
    await Promise.all([
      setQueryData((oldData: any) => ({ ...oldData, images: items }), { refetch: false }),
      deleteImageMutation({ id: item.images[index]!.imageId }),

      Promise.all(
        items.map((image, i) =>
          updateItemMutation({
            id: item.id,
            images: { update: { where: { id: image.id }, data: { order: i + 1 } } },
          })
        )
      ),
    ])
    void refetch()
  }

  return (
    <>
      <Head>
        <title>Admin | Редактирование {item.title}</title>
      </Head>
      <div className="mb-4 font-medium underline flex justify-between	">
        <Link href={Routes.ProductPage({ itemId: item.id })}> Посмотреть товар в магазине</Link>
        <Link href={Routes.AdminItemsPage()}>Список товаров</Link>
      </div>

      <SortableGalleryWithDropzone
        items={item.images}
        s3Path={`u/shop/items/${item.id}/`}
        onUpload={handleUpload}
        onSort={handleSort}
        onDelete={handleDelete}
      />

      <AdminItemForm
        item={item}
        submitText="Сохранить"
        initialValues={item ? { ...item } : {}}
        onSubmit={async (data) => {
          try {
            const { images, ...formData } = data
            updateItemMutation({ id: item?.id, ...formData })
          } catch (error: any) {
            console.error("error")
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </>
  )
}

export default AdminEditItemController
