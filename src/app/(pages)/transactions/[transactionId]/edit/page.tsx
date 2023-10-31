"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import { UpdateTransactionSchema } from "src/transactions/schemas"
import getTransaction from "src/transactions/queries/getTransaction"
import updateTransaction from "src/transactions/mutations/updateTransaction"
import { TransactionForm, FORM_ERROR } from "src/transactions/components/TransactionForm"

const EditTransaction = () => {
  const router = useRouter()
  const transactionId: number = parseInt((useParams()?.transactionId as any) || "-1")
  const [transaction, { setQueryData }] = useQuery(
    getTransaction,
    { id: transactionId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateTransactionMutation] = useMutation(updateTransaction)

  return (
    <>
      <title>Edit Transaction {transaction.id}</title>

      <div>
        <h1>Edit Transaction {transaction.id}</h1>
        <pre>{JSON.stringify(transaction, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <TransactionForm
            submitText="Update Transaction"
            schema={UpdateTransactionSchema}
            initialValues={transaction}
            onSubmit={async (values) => {
              try {
                // @ts-ignore
                const updated = await updateTransactionMutation({
                  id: transaction.id,
                  // ...values,
                })
                // @ts-ignore
                await setQueryData(updated)
                // @ts-ignore
                await router.push(`//transactions/${updated.id}`)
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

const EditTransactionPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTransaction />
      </Suspense>

      <p>
        <Link href={`/transactions`}>Transactions</Link>
      </p>
    </div>
  )
}

EditTransactionPage.authenticate = true
EditTransactionPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTransactionPage
