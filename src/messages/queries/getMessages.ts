import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"
import { paginate } from "blitz"

interface GetMessagesInput
  extends Pick<Prisma.MessageFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetMessagesInput) => {
    const {
      items: messages,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.message.count({ where }),
      query: (paginateArgs) =>
        db.message.findMany({
          ...paginateArgs,
          where,
          orderBy,
          include: {
            sender: {
              select: {
                id: true,
                username: true,
                avatarUrl: true,
              },
            },
          },
        }),
    })

    messages.reverse()

    return {
      messages,
      nextPage,
      hasMore,
      count,
    }
  }
)
