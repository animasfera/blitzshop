"use client"
import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import getTransaction from "src/transactions/queries/getTransaction"
import deleteTransaction from "src/transactions/mutations/deleteTransaction"

export const Transaction = () => {
  const router = useRouter()
  const transactionId = useParam("transactionId", "number")
  const [deleteTransactionMutation] = useMutation(deleteTransaction)
  const [transaction] = useQuery(getTransaction, { id: transactionId })

  return (
    <>
      <Head>
        <title>Transaction {transaction.id}</title>
      </Head>

      <div>
        <h1>Transaction {transaction.id}</h1>
        <pre>{JSON.stringify(transaction, null, 2)}</pre>

        <Link href={Routes.EditTransactionPage({ transactionId: transaction.id })}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTransactionMutation({ id: transaction.id })
              await router.push(Routes.TransactionsPage())
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
        <Link href={Routes.TransactionsPage()}>Transactions</Link>
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
