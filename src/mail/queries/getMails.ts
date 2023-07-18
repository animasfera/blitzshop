import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetMailReceiversInput
  extends Pick<Prisma.MailAggregateArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetMailReceiversInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: mails,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.mail.count({ where }),
      query: (paginateArgs) => db.mail.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      mails,
      nextPage,
      hasMore,
      count,
    }
  }
)
