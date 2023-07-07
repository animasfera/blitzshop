import React from "react"
import { LightModeContext } from "src/core/contexts/lightModeContext"

const useLightMode = () => React.useContext(LightModeContext)

export { LightModeContext, useLightMode }
