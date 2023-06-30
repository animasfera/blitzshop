import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetShippingAddress = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetShippingAddress),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const shippingAddress = await db.shippingAddress.findFirst({
      where: { id },
    })

    if (!shippingAddress) throw new NotFoundError()

    return shippingAddress
  }
)
