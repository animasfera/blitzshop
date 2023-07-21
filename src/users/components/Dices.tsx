import {
  TbDice1 as Dice1,
  TbDice2 as Dice2,
  TbDice3 as Dice3,
  TbDice4 as Dice4,
  TbDice5 as Dice5,
  TbDice6 as Dice6,
} from "react-icons/tb"

import { ReactElement } from "react"
import { Box, Icon, Tooltip, useColorModeValue } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

export const Dices = (props: { level?: number | null; size?: number }) => {
  const { level, size = 15 } = props
  const bgColor = useColorModeValue("black", "white")
  const color = useColorModeValue("white", "black")
  const { t } = useTranslation(["user"])

  if (!level) {
    return <></>
  }

  const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6]
  let diceIconComponents = [] as ReactElement[]

  for (let i = 0; i < level; i++) {
    diceIconComponents.push(<Icon as={diceIcons[i]} transform={"translateY(1px)"} />)
  }

  return (
    <>
      <Tooltip
        hasArrow
        label={t("certificateLevel") + ": " + level}
        placement={"top"}
        bg={bgColor}
        color={color}
      >
        <Box fontSize={size} cursor={"pointer"}>
          {diceIconComponents}
        </Box>
      </Tooltip>
    </>
  )
}
