"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation } from "@blitzjs/rpc"

import Layout from "src/core/layouts/Layout"
import getTransaction from "src/transactions/queries/getTransaction"
import deleteTransaction from "src/transactions/mutations/deleteTransaction"

const Transaction = () => {
  const router = useRouter()
  const transactionId: number = parseInt((useParams()?.transactionId as any) || "-1")
  const [deleteTransactionMutation] = useMutation(deleteTransaction)
  const [transaction] = useQuery(getTransaction, { id: transactionId })

  return (
    <>
      <title>Transaction {transaction.id}</title>

      <div>
        <h1>Transaction {transaction.id}</h1>
        <pre>{JSON.stringify(transaction, null, 2)}</pre>

        <Link href={`/transactions/${transaction.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTransactionMutation({ id: transaction.id })
              await router.push(`/transactions`)
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

const ShowTransactionPage = () => {
  return (
    <div>
      <p>
        <Link href={`/transactions`}>Transactions</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Transaction />
      </Suspense>
    </div>
  )
}

ShowTransactionPage.authenticate = true
ShowTransactionPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTransactionPage
