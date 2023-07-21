import { z } from "zod"

export const withIdOfSchema = (schema: z.ZodObject<any>) => z.object({ id: schema.shape.id })
