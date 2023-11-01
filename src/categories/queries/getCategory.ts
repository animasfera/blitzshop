import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const GetCategory = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional(), // .refine(Boolean, "Required"),
  title: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(GetCategory),
  // resolver.authorize(),
  async ({ id, title }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const category = await db.category.findFirst({
      where: { id, OR: [{ titleRu: title }, { titleEn: title }] },
    })

    if (!category) throw new NotFoundError()

    return category
  }
)
