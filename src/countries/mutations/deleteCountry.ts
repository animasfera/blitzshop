import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteCountrySchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteCountrySchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const country = await db.country.deleteMany({ where: { id } })

    return country
  }
)
