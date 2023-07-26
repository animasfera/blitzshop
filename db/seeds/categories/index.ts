import db from "db"

import { categories } from "./data"

export const createCategories = async () => {
  const { fields, cubes, books } = categories

  try {
    const isFields = await db.category.findFirst({ where: { title: fields.title } })
    const isCubes = await db.category.findFirst({ where: { title: cubes.title } })
    const isBooks = await db.category.findFirst({ where: { title: books.title } })

    if (!isFields) await db.category.create({ data: fields })
    if (!isCubes) await db.category.create({ data: cubes })
    if (!isBooks) await db.category.create({ data: books })
  } catch (err) {
    console.error(err)
  }
}
