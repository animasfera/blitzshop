"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import { CreateTransactionSchema } from "src/transactions/schemas"
import createTransaction from "src/transactions/mutations/createTransaction"
import { TransactionForm, FORM_ERROR } from "src/transactions/components/TransactionForm"

const NewTransactionPage = () => {
  const router = useRouter()
  const [createTransactionMutation] = useMutation(createTransaction)

  return (
    <Layout title={"Create New Transaction"}>
      <h1>Create New Transaction</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <TransactionForm
          submitText="Create Transaction"
          schema={CreateTransactionSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              // @ts-ignore
              const transaction = await createTransactionMutation(values)
              // @ts-ignore
              await router.push(`/transactions/${transaction.id}`)
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
        <Link href={`/transactions`}>Transactions</Link>
      </p>
    </Layout>
  )
}

NewTransactionPage.authenticate = true

export default NewTransactionPage
