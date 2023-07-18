import {
  Box,
  Text,
  Heading,
  OrderedList,
  UnorderedList,
  List,
  ListItem,
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Image,
} from "@chakra-ui/react"

import { BlockData } from "db/zod/edotorjs"

interface Level {
  as: "h2" | "h3" | "h4" | "h5"
  size: "2xl" | "xl" | "lg" | "md"
}

interface HeadingLevel {
  1: Level
  2: Level
  3: Level
  4: Level
}

interface RenderEditorContent {
  typeContent: string
  content: BlockData
}

const level: HeadingLevel = {
  1: {
    as: "h2",
    size: "2xl",
  },
  2: {
    as: "h3",
    size: "xl",
  },
  3: {
    as: "h4",
    size: "lg",
  },
  4: {
    as: "h5",
    size: "md",
  },
}

export const renderEditorContent = (data: RenderEditorContent) => {
  const { typeContent, content } = data

  const param = {
    paragraph: <Text dangerouslySetInnerHTML={{ __html: content?.text ?? "" }} />,
    header: (
      <Heading
        as={content?.level ? level[content?.level].as : level[3].as}
        fontSize={content?.level ? level[content?.level].size : level[3].size}
        dangerouslySetInnerHTML={{ __html: content?.text || "" }}
      />
    ),
    list:
      content?.style === "ordered" ? (
        <OrderedList>
          {content?.items &&
            content.items.map(({ content }, index) => (
              <ListItem
                key={`${index}-${content}}`}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ))}
        </OrderedList>
      ) : (
        <UnorderedList>
          {content?.items &&
            content.items.map(({ content }, index) => (
              <ListItem
                key={`${index}-${content}}`}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ))}
        </UnorderedList>
      ),
    quote: (
      <Box
        mb={3}
        display={"flex"}
        flexDirection={"column"}
        alignItems={content?.alignment === "center" ? "center" : "flex-start"}
        gap={"2px"}
      >
        <Heading
          as={content?.level ? level[content?.level].as : level[3].as}
          fontSize={content?.level ? level[content?.level].size : level[3].size}
          dangerouslySetInnerHTML={{ __html: content?.text || "" }}
        />
        <Text dangerouslySetInnerHTML={{ __html: content?.text ?? "" }} />
      </Box>
    ),
    checklist: (
      <List display={"flex"} flexDirection={"column"} gap={1}>
        {content?.items &&
          content.items.map(({ text, checked }, index) => (
            <ListItem
              key={`${index}-${checked}-${text}}`}
              display={"flex"}
              alignItems={"center"}
              gap={2}
            >
              <Checkbox defaultChecked={checked} isDisabled={true} />
              <Text m={0} dangerouslySetInnerHTML={{ __html: text }} />
            </ListItem>
          ))}
      </List>
    ),
    table: (
      <TableContainer mb={4} pb={8}>
        <Table>
          <Thead>
            <Tr>
              {content?.content &&
                content.content[0]?.map((el, idx) => (
                  <Th key={`${idx}-${el}}`} dangerouslySetInnerHTML={{ __html: el ?? "" }} />
                ))}
            </Tr>
          </Thead>
          <Tbody>
            {content?.content
              ?.map((row, index) => {
                return (
                  <Tr key={`${index}-${row}}`}>
                    {row?.map((el, i) => (
                      <Td key={`${i}-${el}}`} dangerouslySetInnerHTML={{ __html: el ?? "" }} />
                    ))}
                  </Tr>
                )
              })
              .slice(0)}
          </Tbody>
        </Table>
      </TableContainer>
    ),
    warning: (
      <Box mb={3} display={"flex"} flexDirection={"column"} gap={"2px"}>
        <Heading size="md" m={0} dangerouslySetInnerHTML={{ __html: content?.title || "" }} />
        <Text
          m={0}
          fontSize={"14px"}
          dangerouslySetInnerHTML={{ __html: content?.message || "" }}
        />
      </Box>
    ),
    delimiter: (
      <Text
        m={0}
        fontSize={"18px"}
        textAlign={"center"}
        dangerouslySetInnerHTML={{ __html: "* * *" }}
      />
    ),
    image: (
      <Box
        m={4}
        p={content.withBackground ? "15px" : 0}
        maxWidth={content.stretched ? "max-content" : "50%"}
        display={"flex"}
        flexDirection={"column"}
        gap={2}
        background={content.withBackground ? "#e8e8eb" : "none"}
      >
        <Image
          src={content.file?.url}
          w={content.withBackground ? "50%" : "100%"}
          alignSelf={content.withBackground ? "center" : "auto"}
          rounded={8}
          border={content.withBorder ? "2px solid #e8e8eb" : "none"}
        />
        {content.caption && (
          <Text
            as="em"
            m={0}
            fontSize={"14px"}
            textAlign={"center"}
            dangerouslySetInnerHTML={{ __html: content.caption }}
          />
        )}
      </Box>
    ),
  }

  return param[typeContent] ?? <></>
}
