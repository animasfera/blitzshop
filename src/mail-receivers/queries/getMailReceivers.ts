import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetMailReceiversInput
  extends Pick<Prisma.MailReceiverFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetMailReceiversInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: mailReceivers,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.mailReceiver.count({ where }),
      query: (paginateArgs) => db.mailReceiver.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      mailReceivers,
      nextPage,
      hasMore,
      count,
    }
  }
)
