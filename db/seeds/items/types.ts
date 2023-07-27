import { Prisma, Item } from "db"

export type ItemSeed = Item & {
  coverImage: Prisma.ImageToItemCreateInput & {
    image: Prisma.ImageCreateInput
  }
  amount: Prisma.PriceCreateInput
  category: Prisma.CategoryCreateInput
}
