import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateCountrySchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateCountrySchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const country = await db.country.create({ data: input })

    return country
  }
)
