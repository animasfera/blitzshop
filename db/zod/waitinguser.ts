import * as z from "zod"

export const WaitingUserModel = z.object({
  email: z.string(),
  notified: z.boolean(),
})
