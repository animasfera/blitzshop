import { ReactElement } from "react"

export type PickOptionsProps = {
  children: (cities: { label: string; value: string | number }[], disabled: boolean) => ReactElement
}
