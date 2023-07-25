import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import { UpdateInvoiceSchema } from "src/invoices/schemas"
import getInvoice from "src/invoices/queries/getInvoice"
import updateInvoice from "src/invoices/mutations/updateInvoice"
import { InvoiceForm, FORM_ERROR } from "src/invoices/components/InvoiceForm"

export const EditInvoice = () => {
  const router = useRouter()
  const invoiceId = useParam("invoiceId", "number")
  const [invoice, { setQueryData }] = useQuery(
    getInvoice,
    { id: invoiceId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateInvoiceMutation] = useMutation(updateInvoice)

  return (
    <>
      <Head>
        <title>Edit Invoice {invoice.id}</title>
      </Head>

      <div>
        <h1>Edit Invoice {invoice.id}</h1>
        <pre>{JSON.stringify(invoice, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <InvoiceForm
            submitText="Update Invoice"
            schema={UpdateInvoiceSchema}
            initialValues={invoice}
            onSubmit={async (values) => {
              try {
                const updated = await updateInvoiceMutation({
                  id: invoice.id,
                  data: { ...values },
                })

                // @ts-ignore
                await setQueryData(updated)
                // @ts-ignore
                await router.push(Routes.ShowInvoicePage({ invoiceId: updated.id }))
              } catch (error: any) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
        </Suspense>
      </div>
    </>
  )
}

const EditInvoicePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditInvoice />
      </Suspense>

      <p>
        <Link href={Routes.InvoicesPage()}>Invoices</Link>
      </p>
    </div>
  )
}

EditInvoicePage.authenticate = true
EditInvoicePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditInvoicePage
