import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateReviewSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateReviewSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const review = await db.review.create({ data: input })

    return review
  }
)
