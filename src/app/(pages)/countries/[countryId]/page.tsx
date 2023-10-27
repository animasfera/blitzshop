"use client"
import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { useQuery, useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import getCountry from "src/countries/queries/getCountry"
import deleteCountry from "src/countries/mutations/deleteCountry"

const Country = () => {
  const router = useRouter()
  const countryId: string = (useParams()?.countryId as any) || ""
  const [deleteCountryMutation] = useMutation(deleteCountry)
  // @ts-ignore поправить
  const [country] = useQuery(getCountry, { id: countryId })

  return (
    <>
      <Head>
        <title>Country {country.id}</title>
      </Head>

      <div>
        <h1>Country {country.id}</h1>
        <pre>{JSON.stringify(country, null, 2)}</pre>
        <Link href={"/countries/" + country.id + "/edit"}>Edit</Link>
        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteCountryMutation({ id: country.id })
              await router.push("/countries")
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

const ShowCountryPage = () => {
  return (
    <div>
      <p>
        <Link href={"/countries"}>Countries</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Country />
      </Suspense>
    </div>
  )
}

ShowCountryPage.authenticate = true
ShowCountryPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowCountryPage
