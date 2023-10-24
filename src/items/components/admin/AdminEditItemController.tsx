import Head from "next/head"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { FORM_ERROR } from "final-form"
import updateItem from "src/items/mutations/updateItem"
import getItem from "src/items/queries/getItem"
import { AdminItemForm } from "./AdminItemForm"

interface AdminEditItemControllerProps {
  id: number | undefined
}

const AdminEditItemController = (props: AdminEditItemControllerProps) => {
  const { id } = props
  const [item] = useQuery(getItem, { id: id })
  const [updateItemMutation] = useMutation(updateItem)
  return (
    <>
      <Head>
        <title>Admin | Редактирование {item.title}</title>
      </Head>
      <AdminItemForm
        item={item}
        submitText="Сохранить"
        initialValues={item ? { ...item } : {}}
        onSubmit={async (data) => {
          try {
            updateItemMutation({ id: item?.id, ...data })
            // setShowItemForm(false)
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
