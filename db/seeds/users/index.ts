import { SecurePassword } from "@blitzjs/auth/secure-password"
import db from "db"

import { users, password, CreateUserSeedDb } from "./data"

export const createUser = async (user: CreateUserSeedDb) => {
  const hashedPassword = await SecurePassword.hash(password.trim())

  await db.user.create({
    data: {
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      locale: user.locale,
      hashedPassword,
    },
  })
}

export const createUsers = async () => {
  const { roma, videolimiter, mkdir, moderator, user } = users

  try {
    // create admins
    const isRoma = await db.user.findUnique({ where: { username: roma.username } })
    const isVideolimiter = await db.user.findUnique({ where: { username: videolimiter.username } })
    const isMkdir = await db.user.findUnique({ where: { username: mkdir.username } })

    if (!isRoma) {
      await createUser(roma)
    }

    if (!isVideolimiter) {
      await createUser(videolimiter)
    }

    if (!isMkdir) {
      await createUser(mkdir)
    }

    if (process.env.NODE_ENV !== "production") {
      // create moderators
      const isModerator = await db.user.findUnique({ where: { username: moderator.username } })

      if (!isModerator) {
        await createUser(moderator)
      }

      // create users
      const isUser = await db.user.findUnique({ where: { username: user.username } })

      if (!isUser) {
        await createUser(user)
      }
    }
  } catch (err) {
    console.error(err)
  }
}

export default createUsers
