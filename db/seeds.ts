import db from "db"
import { createUsers } from "db/seeds/users"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * to easily generate realistic data.
 */
const seed = async () => {
  if (process.env.NODE_ENV === "test") {
    await db.$reset()
  }

  await db.$reset()

  // create users
  await createUsers()
}

export default seed
