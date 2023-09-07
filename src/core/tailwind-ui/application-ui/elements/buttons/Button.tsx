import React from "react"

interface ButtonProps {
  buttonText?: string
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary" | "soft"
  theme?: "dark"
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  startIcon?: JSX.Element
  endIcon?: JSX.Element
  rounded?: boolean
  disabled?: boolean
  className?: string
  handleClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export const Button = (props: ButtonProps) => {
  const {
    buttonText,
    type = "button",
    variant = "primary",
    theme,
    size = "xl",
    startIcon,
    endIcon,
    rounded = false,
    disabled,
    className,
    handleClick,
  } = props

  const sizeBtn = {
    xs: `${rounded ? "rounded-full" : "rounded"} px-2 py-1 text-xs`,
    sm: `${rounded ? "rounded-full" : "rounded"} px-2 py-1 text-sm`,
    md: `${rounded ? "rounded-full" : "rounded-md"} px-2.5 py-1.5 text-sm`,
    lg: `${rounded ? "rounded-full" : "rounded-md"} px-3 py-2 text-sm`,
    xl: `${rounded ? "rounded-full" : "rounded-md"} px-3.5 py-2.5 text-sm`,
  }

  const variantBtn = {
    primary: `text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
     ${
       theme === "dark"
         ? "bg-indigo-500 hover:bg-indigo-400 focus-visible:outline-indigo-500"
         : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
     }`,
    secondary: `
      ${
        theme === "dark"
          ? "bg-white/10 text-white hover:bg-white/20"
          : "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
      }`,
    soft: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100",
  }

  return (
    <button
      type={type}
      className={`
        inline-flex items-center gap-x-1.5 font-semibold
        ${variantBtn[variant]} ${sizeBtn[size]}
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled}
    >
      {startIcon}

      {buttonText}

      {endIcon}
    </button>
  )
}

export default Button
