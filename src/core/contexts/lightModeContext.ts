import React from "react"
import { ThemeEnum } from "../enums/ThemeEnum"

let LightModeContext: React.Context<{
  mode: string
  setMode: (value: ThemeEnum) => void
}>

LightModeContext = React.createContext({
  mode: "light",
  setMode: (value) => {},
})

export { LightModeContext }
