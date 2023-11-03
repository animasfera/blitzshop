//import { useQuery } from "@blitzjs/rpc"
import React from "react"
import { Modal } from "src/core/tailwind-ui/overlays/Modal"
import getItem from "src/items/queries/getItem"

const AdminItemModalPage = async ({ params }) => {
  console.log("MODDDDDDDDDAAAAAAAAAAAAAAAAAAAAAAALLLLLLLLLLL")
  //const item = useQuery(getItem, { id: params.id })

  return (
    <>
      <Modal isOpen={true}>
        <div>
          {/* {JSON.stringify(item)} */}
          AdminItemModalPage
        </div>
      </Modal>
    </>
  )
}

export default AdminItemModalPage
