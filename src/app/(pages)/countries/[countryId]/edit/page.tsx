"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { useQuery, useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import { UpdateCountrySchema } from "src/countries/schemas"
import getCountry from "src/countries/queries/getCountry"
import updateCountry from "src/countries/mutations/updateCountry"
import { CountryForm, FORM_ERROR } from "src/countries/components/CountryForm"

const EditCountry = () => {
  const router = useRouter()
  const countryId: string = (useParams()?.countryId as any) || ""
  const [country, { setQueryData }] = useQuery(
    getCountry,
    // @ts-ignore поправить
    { id: countryId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateCountryMutation] = useMutation(updateCountry)

  return (
    <>
      <title>Edit Country {country.id}</title>

      <div>
        <h1>Edit Country {country.id}</h1>
        <pre>{JSON.stringify(country, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <CountryForm
            submitText="Update Country"
            schema={UpdateCountrySchema}
            initialValues={country}
            onSubmit={async (values) => {
              try {
                const updated = await updateCountryMutation({
                  id: country.id,
                  // ...values,
                })
                await setQueryData(updated)
                await router.push(`/countries/` + updated.id)
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

const EditCountryPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCountry />
      </Suspense>

      <p>
        <Link href={`/countries`}>Countries</Link>
      </p>
    </div>
  )
}

EditCountryPage.authenticate = true
EditCountryPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditCountryPage
