import { Box, useRadio } from "@chakra-ui/react"

export const RadioCard = (props) => {
  const { getInputProps, getCheckboxProps, ...chakraProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label" flexGrow={1} {...chakraProps}>
      <input {...input} ref={props.ref} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        borderTopLeftRadius={props.first ? "md" : 0}
        borderBottomLeftRadius={props.first ? "md" : 0}
        borderTopRightRadius={props.last ? "md" : 0}
        borderBottomRightRadius={props.last ? "md" : 0}
        boxShadow="md"
        fontSize={14}
        _checked={{
          bg: "purple.600",
          color: "white",
          borderColor: "purple.800",
        }}
        px={3}
        py={"6px"}
        height={"39px"}
        textAlign={"center"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        _focus={{ outline: "none", boxShadow: "none" }}
        _active={{ outline: "none", boxShadow: "none" }}
      >
        {props.children}
      </Box>
    </Box>
  )
}
