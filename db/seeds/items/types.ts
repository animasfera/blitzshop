import { Prisma, Item } from "db"
import { CurrencyEnum } from "@prisma/client"

export type ItemSeed = Item & {
  image: Prisma.ImageCreateInput
  category: Prisma.CategoryCreateInput
}
