import db from "db"

import { createConfigs } from "db/seeds/configs"
import { createUsers } from "db/seeds/users"
import { createCategories } from "db/seeds/categories"
import { createItems } from "db/seeds/items"
import { createOrders } from "db/seeds/orders"

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

  await createConfigs()
  await createUsers()
  await createCategories()

  if (process.env.NODE_ENV !== "production") {
    await createItems()
    await createOrders()
  }
}

export default seed
