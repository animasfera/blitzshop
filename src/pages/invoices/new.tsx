import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import { CreateInvoiceSchema } from "src/invoices/schemas"
import createInvoice from "src/invoices/mutations/createInvoice"
import { InvoiceForm, FORM_ERROR } from "src/invoices/components/InvoiceForm"
import { Suspense } from "react"

const NewInvoicePage = () => {
  const router = useRouter()
  const [createInvoiceMutation] = useMutation(createInvoice)

  return (
    <Layout title={"Create New Invoice"}>
      <h1>Create New Invoice</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <InvoiceForm
          submitText="Create Invoice"
          schema={CreateInvoiceSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const invoice = await createInvoiceMutation(values)
              await router.push(Routes.ShowInvoicePage({ invoiceId: invoice.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </Suspense>
      <p>
        <Link href={Routes.InvoicesPage()}>Invoices</Link>
      </p>
    </Layout>
  )
}

NewInvoicePage.authenticate = true

export default NewInvoicePage
