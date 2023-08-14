"use client"
import { useState } from "react"
import { Box, Flex, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { FiCheck, FiMoreVertical, FiTrash2 } from "react-icons/fi"
import { CardToken } from "@prisma/client"

type CardTokenListItemProps = {
  cardToken: CardToken
  onActivateClick?: (cardToken: CardToken) => void
  onDeleteClick?: (cardToken: CardToken) => void
  activeCardTokenId?: number | null
}

export const CloudpaymentsCardTokenCompact = (props: CardTokenListItemProps) => {
  const { cardToken } = props
  return (
    <>
      {cardToken.cardType} *-{cardToken.cardLastFour}
    </>
  )
}

export const CardTokenListItem = (props: CardTokenListItemProps) => {
  const { cardToken, activeCardTokenId, onActivateClick, onDeleteClick } = props

  const [deleted, setDeleted] = useState(false)

  return (
    <Flex p={5} _hover={{ bg: "#f5f5f5", cursor: "pointer" }} hidden={deleted}>
      <Box flexGrow={1}>
        <CloudpaymentsCardTokenCompact
          cardToken={cardToken}
          activeCardTokenId={activeCardTokenId}
        />
      </Box>
      <Box width={"auto"} flexShrink={0} textAlign={"right"} display={"flex"} alignItems={"center"}>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<Icon as={FiMoreVertical} />}
            aria-label="Options"
            size={"sm"}
            onClick={(e) => {
              e.stopPropagation()
            }}
          />
          <MenuList>
            <MenuItem
              icon={<Icon as={FiCheck} />}
              onClick={(e) => {
                e.stopPropagation()
                onActivateClick && onActivateClick(cardToken)
              }}
            >
              Использовать для выплат
            </MenuItem>

            <MenuItem
              icon={<Icon as={FiTrash2} />}
              onClick={(e) => {
                e.stopPropagation()
                setDeleted(true)
                onDeleteClick && onDeleteClick(cardToken)
              }}
            >
              Удалить
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  )
}
