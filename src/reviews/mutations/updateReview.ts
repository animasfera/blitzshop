import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateReviewSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateReviewSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const review = await db.review.update({ where: { id }, data })

    return review
  }
)
