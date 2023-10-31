"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import { UpdateInvoiceSchema } from "src/invoices/schemas"
import getInvoice from "src/invoices/queries/getInvoice"
import updateInvoice from "src/invoices/mutations/updateInvoice"
import { InvoiceForm, FORM_ERROR } from "src/invoices/components/InvoiceForm"

const EditInvoice = () => {
  const router = useRouter()
  const invoiceId: number = parseInt((useParams()?.invoiceId as any) || "-1")
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
      <title>Edit Invoice {invoice.id}</title>

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
                await router.push(`/invoices/${updated.id}`)
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
        <Link href={`/invoices`}>Invoices</Link>
      </p>
    </div>
  )
}

EditInvoicePage.authenticate = true
EditInvoicePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditInvoicePage
