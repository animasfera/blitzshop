import React from "react"
import { RadioGroup } from "@headlessui/react"

import { classNames } from "src/core/helpers/classNames"
import { OptionRadioButtonField } from "./RadioButtonsField"

interface RadioCardProps {
  option: OptionRadioButtonField
}

export const RadioButtonField = (props: RadioCardProps) => {
  const { option } = props

  return (
    <RadioGroup.Option
      key={option.value}
      value={option}
      className={({ active, checked }) =>
        classNames(
          !option.disabled ? "cursor-pointer focus:outline-none" : "cursor-not-allowed opacity-25",
          active ? "ring-2 ring-indigo-600 ring-offset-2" : "",
          checked
            ? "bg-indigo-600 text-white hover:bg-indigo-500"
            : "ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50",
          "flex items-center justify-center rounded-md py-3 px- text-xs font-semibold uppercase sm:flex-1 text-center"
        )
      }
      disabled={option.disabled}
    >
      <RadioGroup.Label as="span">{option.label}</RadioGroup.Label>
    </RadioGroup.Option>
  )
}

export default RadioButtonField
