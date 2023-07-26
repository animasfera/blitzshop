import { Prisma } from "db"

export const categories = {
  fields: {
    title: "Поля",
  } as Prisma.CategoryCreateInput,
  cubes: {
    title: "Кубики",
  } as Prisma.CategoryCreateInput,
  books: {
    title: "Книги",
  } as Prisma.CategoryCreateInput,
}
