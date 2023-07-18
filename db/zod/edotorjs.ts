import { z } from "zod"

const TableCell = z.string().optional()
const TableRow = z.array(TableCell).optional()
const TableContent = z.array(TableRow).optional()

const ItemDataSchema = z.object({
  content: z.string().optional(),
  text: z.string().optional(),
  checked: z.boolean().optional(),
  items: z.array(z.lazy(() => z.array(ItemDataSchema))).optional(),
})

export const BlockDataSchema = z.object({
  text: z.string().optional(),
  level: z.number().optional(),
  style: z.string().optional(),
  caption: z.string().optional(),
  alignment: z.string().optional(),
  withHeadings: z.boolean().optional(),
  content: TableContent,
  title: z.string().optional(),
  message: z.string().optional(),
  items: z.array(ItemDataSchema).optional(),
  file: z
    .object({
      url: z.string().optional(),
    })
    .optional(),
  withBorder: z.boolean().optional(),
  withBackground: z.boolean().optional(),
  stretched: z.boolean().optional(),
})

export const BlockSchema = z.object({
  type: z.string(),
  data: BlockDataSchema,
})

export const BodySchema = z.object({
  blocks: z.array(BlockSchema),
})

export type Body = z.infer<typeof BodySchema>
export type Block = z.infer<typeof BlockSchema>
export type BlockData = z.infer<typeof BlockDataSchema>
