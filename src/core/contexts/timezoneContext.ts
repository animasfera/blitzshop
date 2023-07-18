import React from "react"

let TimezoneContext: React.Context<{
  timezone: string
  setTimezone: (value: string) => void
}>

TimezoneContext = React.createContext({
  timezone: "Etc/Greenwich",
  setTimezone: (value) => {},
})

export { TimezoneContext }
