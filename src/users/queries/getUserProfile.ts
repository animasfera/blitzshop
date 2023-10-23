import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetUser = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional(),
  username: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(GetUser),
  resolver.authorize(),
  async ({ id, username }) => {
    const query = id ? { id } : { username }
    const user = await db.user.findFirst({
      where: query,
      include: { location: true },
    })

    if (!user) throw new NotFoundError()

    return user
  }
)
