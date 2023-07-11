import { Box, ChakraProps } from "@chakra-ui/react"

export const Leaf = (
  props: ChakraProps & { dir: "left" | "right"; children; theme: "yellow" | "blue" | "white" }
) => {
  const { dir = "left", children, theme = "white", ...chakraProps } = props

  const bgColor = {
    yellow: "#F9F3DF",
    blue: "#48CDD6",
    white: "#FFFFFF",
  }

  if (dir === "left") {
    return (
      <Box
        boxShadow={"0px 0px 40px rgba(198, 163, 87, 0.1)"}
        borderTopEndRadius={chakraProps.borderRadius || "50px"}
        borderBottomLeftRadius={chakraProps.borderRadius || "50px"}
        borderTopLeftRadius={0}
        borderBottomRightRadius={0}
        bgColor={bgColor[theme]}
        color={theme === "blue" ? "white" : "black"}
        {...chakraProps}
      >
        {children}
      </Box>
    )
  } else {
    return (
      <Box
        {...chakraProps}
        boxShadow={"0px 0px 40px rgba(198, 163, 87, 0.1)"}
        borderTopLeftRadius={chakraProps.borderRadius || "50px"}
        borderBottomRightRadius={chakraProps.borderRadius || "50px"}
        borderTopEndRadius={0}
        borderBottomLeftRadius={0}
        bgColor={bgColor[theme]}
        color={theme === "blue" ? "white" : "black"}
        {...chakraProps}
      >
        {children}
      </Box>
    )
  }
}
