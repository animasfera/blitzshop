import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetImageToItemsInput
  extends Pick<Prisma.ImageToItemFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetImageToItemsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: imageToItems,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.imageToItem.count({ where }),
      query: (paginateArgs) => db.imageToItem.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      imageToItems,
      nextPage,
      hasMore,
      count,
    }
  }
)
