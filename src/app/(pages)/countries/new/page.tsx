"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import { CreateCountrySchema } from "src/countries/schemas"
import createCountry from "src/countries/mutations/createCountry"
import { CountryForm, FORM_ERROR } from "src/countries/components/CountryForm"

const NewCountryPage = () => {
  const router = useRouter()
  const [createCountryMutation] = useMutation(createCountry)

  return (
    <Layout title={"Create New Country"}>
      <h1>Create New Country</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <CountryForm
          submitText="Create Country"
          schema={CreateCountrySchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const country = await createCountryMutation(values)
              await router.push("/countries/" + country.id)
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
        <Link href={"/countries"}>Countries</Link>
      </p>
    </Layout>
  )
}

NewCountryPage.authenticate = true

export default NewCountryPage
