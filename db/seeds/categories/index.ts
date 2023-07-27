import db from "db"

import { categories } from "./data"

export const createCategories = async () => {
  const { floorPlayingFields, tablePlayingFields, cubes, books } = categories

  try {
    const isFloorPlayingFields = await db.category.findFirst({
      where: { OR: { titleEn: floorPlayingFields.titleEn, titleRu: floorPlayingFields.titleRu } },
    })
    const isTablePlayingFields = await db.category.findFirst({
      where: { OR: { titleEn: tablePlayingFields.titleEn, titleRu: tablePlayingFields.titleRu } },
    })
    const isCubes = await db.category.findFirst({
      where: { OR: { titleEn: cubes.titleEn, titleRu: cubes.titleRu } },
    })
    const isBooks = await db.category.findFirst({
      where: { OR: { titleEn: books.titleEn, titleRu: books.titleRu } },
    })

    if (!isFloorPlayingFields) await db.category.create({ data: floorPlayingFields })
    if (!isTablePlayingFields) await db.category.create({ data: tablePlayingFields })
    if (!isCubes) await db.category.create({ data: cubes })
    if (!isBooks) await db.category.create({ data: books })
  } catch (err) {
    console.error(err)
  }
}
