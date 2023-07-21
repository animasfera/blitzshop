import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import { UserRoleEnum } from "@prisma/client"
import db from "db"

import { Signup } from "src/auth/schemas"

const CreateUser = Signup

export default resolver.pipe(resolver.zod(CreateUser), resolver.authorize(), async (input) => {
  const hashedPassword = await SecurePassword.hash(input.password.trim())

  const data = {
    username: input.username,
    email: input.email.toLowerCase().trim(),
    hashedPassword,
    role: UserRoleEnum.USER,
  }

  const user = await db.user.create({ data: data })

  return user
})
