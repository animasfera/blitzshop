import React from "react"
import { TimezoneContext } from "src/core/contexts/timezoneContext"

const useTimezone = () => React.useContext(TimezoneContext)

export { TimezoneContext, useTimezone }
