import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db, { UserRoleEnum } from "db"
import { Signup } from "../schemas"

export default resolver.pipe(resolver.zod(Signup), async ({ username, email, password }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())
  const user = await db.user.create({
    data: { username, email: email.toLowerCase().trim(), hashedPassword, role: UserRoleEnum.USER },
    select: { id: true, username: true, email: true, role: true },
  })

  await ctx.session.$create({ userId: user.id, role: user.role as UserRoleEnum })
  return user
})
