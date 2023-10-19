import { Prisma } from "db"

export const paymentMethods = {
  floorPlayingFields: {
    titleRu: "Напольные игровые поля",
    titleEn: "Playing fields on the floor",
  } as Prisma.CategoryCreateInput,
  tablePlayingFields: {
    titleRu: "Настольные игровые поля",
    titleEn: "Playing fields on the table",
  } as Prisma.CategoryCreateInput,
  cubes: {
    titleRu: "Кубики",
    titleEn: "Cubes",
  } as Prisma.CategoryCreateInput,
  books: {
    titleRu: "Книги",
    titleEn: "Books",
  } as Prisma.CategoryCreateInput,
}
