import { Prisma, LocaleEnum, UserRoleEnum } from "db"

export const password = process.env.PASS ?? "100uhfvv"
export const users = {
  // admins
  roma: {
    email: "ketayo1@gmail.com",
    username: "roma",
    role: UserRoleEnum.ADMIN,
  } as Prisma.UserCreateInput,
  videolimiter: {
    email: "videolimiter@gmail.com",
    username: "videolimiter",
    role: UserRoleEnum.ADMIN,
  } as Prisma.UserCreateInput,
  mkdir: {
    email: "mkdir.web.dev@gmail.com",
    username: "mkdir",
    role: UserRoleEnum.ADMIN,
    locale: LocaleEnum.ru,
  } as Prisma.UserCreateInput,

  // moderators
  moderator: {
    email: "example-moderator@mail.com",
    username: "moderator",
    role: UserRoleEnum.MODERATOR,
  } as Prisma.UserCreateInput,

  // users
  user: {
    email: "example-user@mail.com",
    username: "user",
    role: UserRoleEnum.USER,
  } as Prisma.UserCreateInput,
}
