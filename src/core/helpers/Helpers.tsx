"use client"
import { ReactElement, useEffect, useRef } from "react"
import { Text } from "@chakra-ui/react"
import { DateTime } from "luxon"
import { CurrencyEnum } from "db"

export const currencyFormat = ({
  num,
  currency = "EUR",
  skipDivision = false,
  ceil = false,
}: {
  num: number
  currency?: CurrencyEnum
  skipDivision?: boolean
  ceil?: boolean
}) => {
  const currencySymbols = {
    RUB: "₽",
    USD: "$",
    EUR: "€",
  }
  if (!skipDivision) {
    num = num / 100 // cents
  }

  if (ceil) {
    return Math.ceil(num) + " " + currencySymbols[currency]
  }
  return (
    num.toFixed(skipDivision ? 3 : 2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ") +
    " " +
    currencySymbols[currency]
  )
}

export const isLatLngLiteral = (obj: any) => {
  return obj.lat && obj.lng
}
export const isLatLngBoundsLiteral = (obj: any) => {
  return obj.south && obj.west && obj.east && obj.north
}

export const sum = function (array: any[], key: string, _where: { [key: string]: any } = {}) {
  const where = _where || {}
  const keys = Object.keys(where)
  const values = Object.values(where)
  const _key = keys[0] || ""
  const _value = values[0] || ""
  if (keys.length > 0) {
    return array.reduce((a, b) => a + (b[_key] === _value ? b[key] || 0 : 0), 0)
  } else {
    return array.reduce((a, b) => a + (b[key] || 0), 0)
  }
}

export const nl2br = (string: string | null | undefined, useP = true): ReactElement[] => {
  if (string) {
    return string
      .trim()
      .split("\n")
      .map((item, index, arr) => {
        return useP ? (
          <Text key={index} mb={4}>
            {item}
          </Text>
        ) : (
          <>
            {item}
            {index < arr.length - 1 && <br />}
          </>
        )
      })
  } else {
    return [<></>]
  }
}

export const useTraceUpdate = (props) => {
  const prev = useRef(props)
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v]
      }
      return ps
    }, {})
    if (Object.keys(changedProps).length > 0) {
      console.log("Changed props:", changedProps)
    }
    prev.current = props
  })
}

export const dateFormat = (jsDate: Date, withTime = true) => {
  if (!(jsDate instanceof Date)) {
    return ""
  } else {
    return DateTime.fromJSDate(jsDate).toLocaleString(
      withTime ? DateTime.DATETIME_MED : DateTime.DATE_MED
    )
  }
}

export const UserCan = () => {
  const allow = () => {}

  const can = () => {}

  return
}

export const numWord = (value, words) => {
  value = Math.abs(value) % 100
  var num = value % 10
  if (value > 10 && value < 20) return words[2] || words[1]
  if (num > 1 && num < 5) return words[1]
  if (num == 1) return words[0]
  return words[2]
}

const usePrevious = (value) => {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value]) // only re-run if value changes

  // return previous value (happens before update in useEffect)
  return ref.current
}
