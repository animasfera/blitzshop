import db from "db"
import { OrderStatusEnum } from "@prisma/client"
import cron from "node-cron"

// cron.schedule('0 * * * *', function() {
const date = new Date()
date.setMinutes(date.getMinutes() - 1)
db.order.deleteMany({
  where: {
    createdAt: { gte: date.toISOString() },
    // status: { in: ["pending", "failed"] },
    status: { in: [OrderStatusEnum.PENDING] },
  },
})
// })
