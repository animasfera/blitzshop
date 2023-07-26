import db from "db"

import { items } from "./data"

export const createItems = async () => {
  const {} = items

  // const where = { OR: { titleEn: fields.titleEn, titleRu: fields.titleRu } }

  try {
    // const isFields = await db.category.findFirst({ where })
    // if (!isFields) await db.category.create({ data: fields })
  } catch (err) {
    console.error(err)
  }
}
