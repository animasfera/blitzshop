import db from "db"

import { items } from "./data"
import { ItemSeed } from "./types"

const createDataItems = async (obj: ItemSeed) => {
  let coverImage = await db.image.findFirst({
    where: {
      AND: { title: obj.coverImage.image.title, url: obj.coverImage.image.url },
    },
    select: { id: true, title: true, description: true, url: true },
  })

  let imageToItem = coverImage
    ? await db.imageToItem.findFirst({ where: { imageId: coverImage?.id } })
    : null

  let amount = await db.price.findFirst({
    where: {
      AND: { amount: obj.amount.amount, currency: obj.amount.currency },
    },
    select: { id: true, amount: true, currency: true },
  })

  let category

  if (!!obj?.category?.titleEn && !!obj?.category?.titleRu) {
    category = await db.category.findFirst({
      where: { OR: { titleEn: obj.category.titleEn, titleRu: obj.category.titleRu } },
    })
  }

  if (!coverImage) {
    coverImage = await db.image.create({
      data: obj.coverImage.image,
      select: { id: true, title: true, description: true, url: true },
    })
  }

  if (!imageToItem) {
    imageToItem = await db.imageToItem.create({
      data: { imageId: coverImage.id },
    })
  }

  if (!amount) {
    amount = await db.price.create({
      data: obj.amount,
      select: { id: true, amount: true, currency: true },
    })
  }

  if (!category && !!obj.category) {
    category = await db.category.create({ data: { ...obj.category, numItems: 1 } })
  }

  await db.item.create({
    data: {
      title: obj.title,
      access: obj.access ?? undefined,
      status: obj.status ?? null,
      coverImageId: imageToItem.id,
      amountId: amount.id,
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
