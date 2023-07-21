import { useState } from "react"

export const usePagination = () => {
  const [page, setPage] = useState(0)
  return { page, setPage }
}
