import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"

import Layout from "src/core/layouts/Layout"
import { UpdateLocationSchema } from "src/locations/schemas"
import getLocation from "src/locations/queries/getLocation"
import updateLocation from "src/locations/mutations/updateLocation"
import { LocationForm, FORM_ERROR } from "src/locations/components/LocationForm"

export const EditLocation = () => {
  const router = useRouter()
  const locationId = useParam("locationId", "number")
  const [location, { setQueryData }] = useQuery(
    getLocation,
    { id: locationId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateLocationMutation] = useMutation(updateLocation)

  return (
    <>
      <Head>
        <title>Edit Location {location.id}</title>
      </Head>

      <div>
        <h1>Edit Location {location.id}</h1>
        <pre>{JSON.stringify(location, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <LocationForm
            submitText="Update Location"
            schema={UpdateLocationSchema}
            initialValues={location}
            onSubmit={async (values) => {
              try {
                const updated = await updateLocationMutation({
                  id: location.id,
                  // ...values,
                })
                await setQueryData(updated)
                await router.push(Routes.ShowLocationPage({ locationId: updated.id }))
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

const EditLocationPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditLocation />
      </Suspense>

      <p>
        <Link href={Routes.LocationsPage()}>Locations</Link>
      </p>
    </div>
  )
}

EditLocationPage.authenticate = true
EditLocationPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditLocationPage
