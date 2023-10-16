import { resolver } from "@blitzjs/rpc"
import { z } from "zod"

import { CreateTransactionSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(z.object({ transactions: CreateTransactionSchema.array() })),
  resolver.authorize(),
  async (input) => {
    const sum = function (array: any[], key: string) {
      return array.reduce((a, b) => a + (b[key] || 0), 0)
    }

    return true
  }
)
