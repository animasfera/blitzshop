import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const DeleteUser = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteUser), resolver.authorize(), async ({ id }) => {
  const user = await db.user.deleteMany({ where: { id } })

  return user
})
