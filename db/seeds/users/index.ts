import { SecurePassword } from "@blitzjs/auth/secure-password"
import db from "db"

import { users, password } from "./data"

export const createUsers = async () => {
  const { roma, videolimiter, mkdir, moderator, user } = users

  const hashedPassword = await SecurePassword.hash(password.trim())

  try {
    // create admins
    const isRoma = await db.user.findUnique({ where: { username: roma.username } })
    const isVideolimiter = await db.user.findUnique({ where: { username: videolimiter.username } })
    const isMkdir = await db.user.findUnique({ where: { username: mkdir.username } })

    if (!isRoma) {
      await db.user.create({
        data: { ...roma, hashedPassword },
      })
    }

    if (!isVideolimiter) {
      await db.user.create({
        data: { ...videolimiter, hashedPassword },
      })
    }

    if (!isMkdir) {
      await db.user.create({
        data: { ...mkdir, hashedPassword },
      })
    }

    if (process.env.NODE_ENV !== "production") {
      // create moderators
      const isModerator = await db.user.findUnique({ where: { username: moderator.username } })

      if (!isModerator) {
        await db.user.create({
          data: { ...moderator, hashedPassword },
        })
      }

      // create users
      const isUser = await db.user.findUnique({ where: { username: user.username } })

      if (!isUser) {
        await db.user.create({
          data: { ...user, hashedPassword },
        })
      }
    }
  } catch (err) {
    console.error(err)
  }
}

export default createUsers
