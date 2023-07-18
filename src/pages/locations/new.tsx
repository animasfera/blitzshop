import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import { CreateLocationSchema } from "src/locations/schemas"
import createLocation from "src/locations/mutations/createLocation"
import { LocationForm, FORM_ERROR } from "src/locations/components/LocationForm"
import { Suspense } from "react"

const NewLocationPage = () => {
  const router = useRouter()
  const [createLocationMutation] = useMutation(createLocation)

  return (
    <Layout title={"Create New Location"}>
      <h1>Create New Location</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LocationForm
          submitText="Create Location"
          schema={CreateLocationSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const location = await createLocationMutation(values)
              await router.push(Routes.ShowLocationPage({ locationId: location.id }))
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
        <Link href={Routes.LocationsPage()}>Locations</Link>
      </p>
    </Layout>
  )
}

NewLocationPage.authenticate = true

export default NewLocationPage
