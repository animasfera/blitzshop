import { DateTime } from "luxon"
import { Box, ChakraProps } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

import { useTimezone } from "../hooks/useTimezone"
import { LocaleEnum } from "@prisma/client"

export const Date = (
  props: ChakraProps & {
    date: Date | undefined | null
    withTime?: boolean
    relative?: boolean
    as?: string
  }
) => {
  const { date, withTime, relative, as, ...rest } = props
  let dateFormatted = ""
  const { i18n } = useTranslation(["translation"])
  const timezoneCtx = useTimezone()

  if (!date) {
    return <></>
  }

  let _date = DateTime.fromJSDate(date).setLocale(i18n.resolvedLanguage ?? LocaleEnum.en)

  if (relative && _date.toRelative() !== null) {
    dateFormatted = _date.toRelative()!
  } else {
    _date = _date.setZone(timezoneCtx.timezone)

    let month = _date?.monthShort?.slice(0, 3)
    if (month === "май") {
      month = "мая"
    }
    dateFormatted = _date.day + " " + month

    if (_date.year !== DateTime.now().year) {
      dateFormatted += " " + _date.year
    }
    if (withTime) {
      dateFormatted +=
        ", " +
        _date
          .setLocale(i18n.resolvedLanguage ?? LocaleEnum.en)
          .toLocaleString(DateTime.TIME_24_SIMPLE)
    }
  }

  const offset =
    " (" +
    "GMT" +
    (_date.offset !== 0
      ? (_date.offset >= 0 ? "+" : "") +
        ((_date.offset / 60) | 0) +
        (_date.offset % 60 > 0 ? ":" + (_date.offset % 60).toString().padStart(2, "0") : "")
      : "") +
    ")"

  return (
    <Box as={"span"} color={"#999"} {...rest} whiteSpace={"nowrap"}>
      {dateFormatted} {withTime && offset}
    </Box>
  )
}

export const DateWithTime = (props: ChakraProps & { date: Date; [key: string]: any }) => {
  return <Date {...props} withTime={true} />
}
