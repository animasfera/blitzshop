import db from "db"

import { categories } from "./data"

export const createCategories = async () => {
  const { fields, cubes, books } = categories

  const where = { OR: { titleEn: fields.titleEn, titleRu: fields.titleRu } }

  try {
    const isFields = await db.category.findFirst({ where })
    const isCubes = await db.category.findFirst({ where })
    const isBooks = await db.category.findFirst({ where })

    if (!isFields) await db.category.create({ data: fields })
    if (!isCubes) await db.category.create({ data: cubes })
    if (!isBooks) await db.category.create({ data: books })
  } catch (err) {
    console.error(err)
  }
}
