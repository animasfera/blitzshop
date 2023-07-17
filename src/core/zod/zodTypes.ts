import { z } from "zod"

type Literal = boolean | null | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
export const JsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(JsonSchema), z.record(JsonSchema), z.null()])
)
