import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/free-solid-svg-icons"

interface ButtonLinkProps {
  buttonText?: string
  startIcon?: IconDefinition
  endIcon?: IconDefinition
  active?: boolean
  disabled?: boolean
  className?: string
  handleClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export const ButtonLink = (props: ButtonLinkProps) => {
  const { buttonText, startIcon, endIcon, active, disabled, className, handleClick } = props

  return (
    <div className={`-mt-px flex flex-1 ${className ?? ""}`}>
      <button
        className={`
          inline-flex items-center border-t-2 pt-4 px-2 gap-2 text-sm font-medium border-indigo-500
          ${!disabled && "hover:border-gray-300 hover:text-gray-700"}
          ${active ? `border-indigo-500 text-indigo-600` : "border-transparent text-gray-500"}
        `}
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        disabled={disabled}
        onClick={handleClick}
      >
        {startIcon && (
          <FontAwesomeIcon
            icon={startIcon}
            className={`h-5 w-5 text-gray-400 ${active ? "text-indigo-600" : "text-gray-500"}`}
            aria-hidden="true"
          />
        )}
        {buttonText}
        {endIcon && (
          <FontAwesomeIcon
            icon={endIcon}
            className={`h-5 w-5 text-gray-400 ${active ? "text-indigo-600" : "text-gray-500"}`}
            aria-hidden="true"
          />
        )}
      </button>
    </div>
  )
}

export default ButtonLink
