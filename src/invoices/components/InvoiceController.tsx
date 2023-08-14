"use client"
import { useQuery } from "@blitzjs/rpc"
import getInvoice from "../queries/getInvoice"
import { InvoiceView } from "./InvoiceView"

export const InvoiceController = (props: { id: number }) => {
  const { id } = props

  let [invoice] = useQuery(getInvoice, { id })

  return (
    <>
      <InvoiceView
        // !!! поправить
        // @ts-ignore
        invoice={invoice}
      />
    </>
  )
}
