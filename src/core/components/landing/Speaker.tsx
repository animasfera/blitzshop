import { Box, Image, Heading } from "@chakra-ui/react"

export const Speaker = (props) => {
  const { src, title, link } = props
  return (
    <Box
      borderRadius={"30px"}
      border={"1px solid rgba(198, 163, 87, 0.5)"}
      p={"24px"}
      textAlign={"center"}
    >
      <Box mb={4} textAlign={"center"}>
        <Image src={src} />
      </Box>
      <Heading size={"sm"} color={"rgba(198, 163, 87, 0.5)"}>
        {title}
      </Heading>
      <a href={link}>Смотреть на YouTube</a>
    </Box>
  )
}
