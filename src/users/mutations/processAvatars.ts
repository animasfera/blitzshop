import { resolver } from "@blitzjs/rpc"
import db from "db"

import { ImagesQueue } from "src/core/queues"

export default resolver.pipe(resolver.authorize(), async (input) => {
  const users = await db.user.findMany()
  const usersWithAvatars = users.filter((u) => !!u.avatarUrl)

  for (const user of usersWithAvatars) {
    ImagesQueue.add("processAvatar", { userId: user.id })
  }
})
