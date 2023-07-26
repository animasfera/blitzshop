import { Prisma } from "db"

export const categories = {
  fields: {
    titleRu: "Поля",
    titleEn: "Fields",
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
