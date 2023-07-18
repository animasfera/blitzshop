import { AspectRatio, Box, Container, Heading, SimpleGrid } from "@chakra-ui/react"

import { useCurrentUser } from "src/core/hooks/useCurrentUser"
import { Speaker } from "./Speaker"

const speakers = [
  {
    src: "/landing/speakers/omkar.png",
    title: "Владимир Скобелев (Омкар)",
    link: "https://us02web.zoom.us/j/86334156653?pwd=V0lmWFRRL0R6Tm56QTdRUHNoMWI3QT09",
  },
  {
    src: "/landing/speakers/karakuyan.png",
    title: "Ирина Каракуян",
    link: "https://us06web.zoom.us/j/87038367010?pwd=RXY2MUF5MWNwMkFNTDZnN1dDTVRsdz09",
  },
  {
    src: "/landing/speakers/nemolyaev.png",
    title: "Евгений Немоляев",
    link: "https://us06web.zoom.us/j/83043321905?pwd=OFZ5NTQ0bWdPMG1tYnkxOG9oOE5PUT09",
  },
  {
    src: "/landing/speakers/ariadna.png",
    title: "Адриана Дашкевич",
    link: "https://us02web.zoom.us/j/84408787109?pwd=VGtsdXErTi83R08yeVE1TVBtU1RZQT09",
  },
]

export const LiveVideo = () => {
  const user = useCurrentUser()
  return (
    <>
      <Container
        maxW={"container.lg"}
        pt={["10px", "64px"]}
        position={"relative"}
        overflow={"hidden"}
      >
        <Box
          position={"absolute"}
          display={user && user.id ? "none" : "flex"}
          justifyContent={"center"}
          alignItems={"center"}
          zIndex={1}
          flexDirection={"column"}
          height={"100%"}
          width={"100%"}
          padding={"50px"}
          textAlign={"center"}
        >
          <Box
            display={user && user.id ? "none" : "block"}
            color={"white"}
            fontSize={["14px", "18px"]}
            textShadow={"0 0 15px rgba(0,0,0,.2)"}
          >
            Войдите, чтобы начать просмотр онлайн трансляции фестиваля.
          </Box>
        </Box>
        <AspectRatio
          maxW="100%"
          ratio={16 / 9}
          overflow={"hidden"}
          filter={user && user.id ? "none" : "blur(8px)"}
        >
          <iframe
            title="Leela Fest"
            src="https://www.youtube.com/embed/zwmdczp4GyY"
            allowFullScreen
          />
        </AspectRatio>
      </Container>

      <Container maxW={"container.lg"} mt={user && user.id ? 0 : [12, 12, 100]}>
        <Heading
          textAlign={"center"}
          fontSize={["26px !important", "26px !important", "42px !important"]}
          pt={user && user.id ? [12, 12, 100] : 0}
        >
          Онлайн-трансляции
        </Heading>
        <SimpleGrid columns={[2, 2, 4]} spacing={["20px", "20px", "40px"]} pt={[0, 0, "30px"]}>
          {speakers.map(({ src, title, link }) => (
            <Speaker key={`${title}-${link}`} src={src} title={title} link={link} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  )
}
