import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"
import { TransactionStatusEnum, TransactionTypeEnum } from "@prisma/client"
import { paginate } from "blitz"

interface GetTransactionsInput
  extends Pick<Prisma.TransactionFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetTransactionsInput) => {
    const {
      items: transactions,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.transaction.count({ where }),
      query: (paginateArgs) =>
        db.transaction.findMany({
          ...paginateArgs,
          where: {
            ...where,
            type: { in: [TransactionTypeEnum.SALE, TransactionTypeEnum.REFUND] },
            status: TransactionStatusEnum.FINISHED,
          },
          include: {
            amount: true,
            feeTotal: true,
            invoice: true,
            net: true,
            paymentMethod: true,
            user: true,
          },
          orderBy: {
            id: "desc",
            ...orderBy,
          },
        }),
    })

    return {
      transactions,
      nextPage,
      hasMore,
      count,
    }
  }
)
