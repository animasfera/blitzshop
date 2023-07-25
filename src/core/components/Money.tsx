import { Box, ChakraProps } from "@chakra-ui/react"
import { currencyFormat } from "../helpers/Helpers"

export const Money = (
  props: ChakraProps & { amount: number; currency?: string; withPlus?: boolean }
) => {
  const { amount, currency = "EUR", withPlus = false, ...chakraProps } = props
  let plus = ""
  if (withPlus) {
    plus = amount > 0 ? "+" : ""
  }
  return (
    <Box as={"span"} {...chakraProps} whiteSpace={"nowrap"}>
      {plus}
      {currencyFormat(amount, currency)}
    </Box>
  )
}
