import db from "db"

import { createConfigs } from "db/seeds/configs"
import { createUsers } from "db/seeds/users"
import { createCategories } from "db/seeds/categories"
import { createItems } from "db/seeds/items"
import { createPaymentMethods } from "./seeds/paymentMethods"
import { createOrders } from "db/seeds/orders"
import { createDeliveryParams } from "db/seeds/delivery"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * to easily generate realistic data.
 */
const seed = async () => {
  /*
  if (process.env.NODE_ENV === "test") {
    await db.$reset()
  }
  */

  if (process.env.NODE_ENV !== "production") {
    await db.$reset()
  }

  await createConfigs()
  await createPaymentMethods()
  await createUsers()
  await createCategories()

  // params for delivery
  // TODO: добавить в bull
  await createDeliveryParams()

  if (process.env.NODE_ENV !== "production") {
    await createItems()
    await createOrders()
  }
}

export default seed
