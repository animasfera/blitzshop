import { Prisma, ItemStatusEnum, AccessTypeEnum } from "db"

export const items = {
  fields: {
    title: "",
    access: AccessTypeEnum.PUBLIC,
    status: ItemStatusEnum.SALE,
  } as Prisma.ItemCreateInput,
}
