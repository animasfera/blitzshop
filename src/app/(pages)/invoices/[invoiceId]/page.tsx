"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getInvoice from "src/invoices/queries/getInvoice"
import deleteInvoice from "src/invoices/mutations/deleteInvoice"

const Invoice = () => {
  const router = useRouter()
  const invoiceId = useParam("invoiceId", "number")
  const [deleteInvoiceMutation] = useMutation(deleteInvoice)
  const [invoice] = useQuery(getInvoice, { id: invoiceId })

  return (
    <>
      <title>Invoice {invoice.id}</title>

      <div>
        <h1>Invoice {invoice.id}</h1>
        <pre>{JSON.stringify(invoice, null, 2)}</pre>

        <Link href={`/invoices/${invoice.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteInvoiceMutation({ id: invoice.id })
              await router.push(`/invoices`)
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowInvoicePage = () => {
  return (
    <div>
      <p>
        <Link href={`/invoices`}>Invoices</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Invoice />
      </Suspense>
    </div>
  )
}

ShowInvoicePage.authenticate = true
ShowInvoicePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowInvoicePage