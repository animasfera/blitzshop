import { RadioGroup } from "@headlessui/react"
import { CheckCircleIcon } from "@heroicons/react/20/solid"

import { classNames } from "src/core/helpers/classNames"
import { OptionRadioSelectedCard } from "./RadioSelectedCardsField"

interface RadioSelectedCardProps {
  defaultValue?: OptionRadioSelectedCard
  selected?: OptionRadioSelectedCard
  option: OptionRadioSelectedCard
  disabled?: boolean
}

export const RadioSelectedCard = (props: RadioSelectedCardProps) => {
  const { defaultValue, selected, option, disabled } = props

  const checkedOption = selected ?? defaultValue

  return (
    <RadioGroup.Option
      value={option}
      className={({ active }) =>
        classNames(
          active ? "border-indigo-600 ring-2 ring-indigo-600" : "border-gray-300",
          `relative flex rounded-lg border bg-white p-4 shadow-sm focus:outline-none
          ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`
        )
      }
    >
      {({ checked, active }) => (
        <>
          <span className="flex flex-1">
            <span className="flex flex-col">
              <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                {option.label}
              </RadioGroup.Label>
              {option?.description && (
                <RadioGroup.Description
                  as="span"
                  className="mt-1 flex items-center text-sm text-gray-500"
                >
                  {option?.description}
                </RadioGroup.Description>
              )}
              {option?.footerText && (
                <RadioGroup.Description
                  as="span"
                  className="mt-6 text-sm font-medium text-gray-900"
                >
                  {option.footerText}
                </RadioGroup.Description>
              )}
            </span>
          </span>
          <CheckCircleIcon
            className={classNames(
              !checked || checkedOption?.value !== option.value ? "invisible" : "",
              "h-5 w-5 text-indigo-600"
            )}
            aria-hidden="true"
          />
          <span
            className={classNames(
              active ? "border" : "border-2",
              checked ? "border-indigo-600" : "border-transparent",
              "pointer-events-none absolute -inset-px rounded-lg"
            )}
            aria-hidden="true"
          />
        </>
      )}
    </RadioGroup.Option>
  )
}

export default RadioSelectedCard
