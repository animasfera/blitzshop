import db from "db"
import { Ctx } from "blitz"
import {
  startNotificationsTransaction,
  NotificationsTransactionType,
} from "../src/core/notifications/NotificationsTransaction"
import { PrismaDbType } from "../types"

export const startTransaction = async <T>(
  dbQuery: (
    data: any,
    ctx: Ctx,
    db: PrismaDbType,
    notifications: NotificationsTransactionType
  ) => Promise<T>,
  data: { [key: string]: any },
  ctx: Ctx
): Promise<T> => {
  let notifications = startNotificationsTransaction()
  return db
    .$transaction(($db) => {
      return dbQuery(data, ctx, $db, notifications)
    })
    .then(async (data) => {
      console.log("Commit Transactions")
      await notifications.commit()
      return data
    })
}
