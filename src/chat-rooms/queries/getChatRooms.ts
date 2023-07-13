import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"
import { paginate } from "blitz"

interface GetChatRoomsInput
  extends Pick<Prisma.ChatRoomFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetChatRoomsInput, ctx) => {
    const {
      items: chatRooms,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.chatRoom.count({ where }),
      query: (paginateArgs) =>
        db.chatRoom.findMany({
          ...paginateArgs,
          where,
          orderBy,
          include: {
            users: {
              include: {
                user: {
                  select: {
                    id: true,
                    avatarUrl: true,
                    username: true,
                  },
                },
              },
            },
            // TODO cache into JSON field
            messages: {
              take: 1,
              orderBy: { id: "desc" },
              include: {
                sender: {
                  select: {
                    id: true,
                    avatarUrl: true,
                    username: true,
                  },
                },
              },
            },
          },
        }),
    })

    return {
      chatRooms,
      nextPage,
      hasMore,
      count,
    }
  }
)
