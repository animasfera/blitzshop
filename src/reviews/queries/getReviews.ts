import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetReviewsInput
  extends Pick<Prisma.ReviewFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetReviewsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: reviews,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.review.count({ where }),
      query: (paginateArgs) => db.review.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      reviews,
      nextPage,
      hasMore,
      count,
    }
  }
)
