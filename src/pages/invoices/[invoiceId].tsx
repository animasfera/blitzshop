import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getInvoice from "src/invoices/queries/getInvoice"
import deleteInvoice from "src/invoices/mutations/deleteInvoice"

export const Invoice = () => {
  const router = useRouter()
  const invoiceId = useParam("invoiceId", "number")
  const [deleteInvoiceMutation] = useMutation(deleteInvoice)
  const [invoice] = useQuery(getInvoice, { id: invoiceId })

  return (
    <>
      <Head>
        <title>Invoice {invoice.id}</title>
      </Head>

      <div>
        <h1>Invoice {invoice.id}</h1>
        <pre>{JSON.stringify(invoice, null, 2)}</pre>

        <Link href={Routes.EditInvoicePage({ invoiceId: invoice.id })}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteInvoiceMutation({ id: invoice.id })
              await router.push(Routes.InvoicesPage())
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
        <Link href={Routes.InvoicesPage()}>Invoices</Link>
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
