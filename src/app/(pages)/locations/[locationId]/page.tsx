"use client"
import { Suspense } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation } from "@blitzjs/rpc"
import Layout from "src/core/layouts/Layout"
import getLocation from "src/locations/queries/getLocation"
import deleteLocation from "src/locations/mutations/deleteLocation"

const Location = () => {
  const router = useRouter()
  const locationId: number = parseInt((useParams()?.locationId as any) || "-1")
  const [deleteLocationMutation] = useMutation(deleteLocation)
  const [location] = useQuery(getLocation, { id: locationId })

  return (
    <>
      <title>Location {location.id}</title>

      <div>
        <h1>Location {location.id}</h1>
        <pre>{JSON.stringify(location, null, 2)}</pre>

        <Link href={`/locations/${location.id}/edit/`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteLocationMutation({ id: location.id })
              await router.push(`/locations`)
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

const ShowLocationPage = () => {
  return (
    <div>
      <p>
        <Link href={`/locations`}>Locations</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Location />
      </Suspense>
    </div>
  )
}

ShowLocationPage.authenticate = true
ShowLocationPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowLocationPage
