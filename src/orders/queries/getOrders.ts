import { AuthenticationError, Ctx, paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma, UserRoleEnum } from "db"

interface GetOrdersInput
  extends Pick<Prisma.OrderFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetOrdersInput, ctx: Ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    if (where?.userId !== ctx.session?.userId && ctx.session.role !== UserRoleEnum.ADMIN) {
      // TODO: добавить перевод для вывода ошибки
      throw new AuthenticationError("Недостаточно прав")
    }

    const {
      items: orders,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.order.count({ where }),
      query: (paginateArgs) =>
        db.order.findMany({
          ...paginateArgs,
          where,
          orderBy,
          include: {
            user: { select: { id: true, email: true, username: true } },
            items: {
              include: {
                category: true,
                coverImage: true,
                item: {
                  include: { user: { select: { email: true, id: true, username: true } } },
                },
              },
            },
          },
        }),
    })

    return {
      orders,
      nextPage,
      hasMore,
      count,
    }
  }
)
