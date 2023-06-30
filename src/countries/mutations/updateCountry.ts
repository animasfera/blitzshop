import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateCountrySchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateCountrySchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const country = await db.country.update({ where: { id }, data })

    return country
  }
)
