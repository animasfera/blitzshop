import { LocationModel } from "db/zod"
import { z } from "zod"

export const CreateLocationSchema = LocationModel.pick({
  lat: true,
  lng: true,
  address: true,
  addressRu: true,
  addressEn: true,
  cityRu: true,
  cityEn: true,
  city: true,
  countryId: true,
})

export const UpdateLocationSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteLocationSchema = z.object({
  id: z.number(),
})
