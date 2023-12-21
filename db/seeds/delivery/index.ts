import { createCountriesForDelivery } from "db/seeds/delivery/countries"
// import { createRegionsForDelivery } from "db/seeds/delivery/regions"
// import { createCitiesForDelivery } from "db/seeds/delivery/cities"
// import { createPostalCodesForDelivery } from "db/seeds/delivery/postalCodes"
// import { createPickupPointsForDelivery } from "db/seeds/delivery/pickupPoints"

export const createDeliveryParams = async () => {
  await createCountriesForDelivery()
  // await createRegionsForDelivery()
  // await createCitiesForDelivery()
  // await createPostalCodesForDelivery()
  // await createPickupPointsForDelivery()
}

export default createDeliveryParams
