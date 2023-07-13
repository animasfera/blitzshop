import React from "react"
import { Button } from "@chakra-ui/react"

export const ToolbarButton = (props) => {
  const { icon } = props

  return <Button rightIcon={icon ?? ""} />
}

export default ToolbarButton
