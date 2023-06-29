import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteReviewSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteReviewSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const review = await db.review.deleteMany({ where: { id } })

    return review
  }
)
