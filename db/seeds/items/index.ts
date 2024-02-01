import db from "db"

import { items } from "./data"
import { ItemSeed } from "./types"
import { CurrencyEnum } from "@prisma/client"

const createDataItems = async (obj: ItemSeed) => {
  let category

  if (!!obj?.category?.titleEn && !!obj?.category?.titleRu) {
    category = await db.category.findFirst({
      where: { OR: { titleEn: obj.category.titleEn, titleRu: obj.category.titleRu } },
    })
  }

  if (!category && !!obj.category) {
    category = await db.category.create({ data: { ...obj.category, numItems: 1 } })
  }

  await db.item.create({
    data: {
      title: obj.title || "",
      access: obj.access ?? undefined,
      status: obj.status ?? null,
      images: {
        create: {
          image: {
            create: obj.image,
          },
        },
      },
      qty: 10,
      price: obj.price,
      currency: CurrencyEnum.EUR,
      categoryId: category.id,
    },
  })

  const filterItems = await db.item.findMany({
    where: { categoryId: category.id },
  })

  await db.category.update({
    where: { id: category.id },
    data: { numItems: filterItems.length },
  })
}

export const createItems = async () => {
  try {
    const array: ItemSeed[] = Object.values(items)

    for (let index = 0; index < array.length; index++) {
      const el = array[index]

      if (!!el) await createDataItems(el)
    }
  } catch (err) {
    console.error(err)
  }
}

export default createItems
