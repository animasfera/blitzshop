interface ButtonProps {
  buttonText?: string | number
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary" | "soft" | "link"
  theme?: "dark"
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  startIcon?: JSX.Element
  endIcon?: JSX.Element
  rounded?: boolean
  disabled?: boolean
  styles?: string
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
    styles,
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
    link: "text-indigo-600 hover:text-indigo-500 shadow-none",
  }

  return (
    <button
      type={type}
      className={`
      ${styles}
        inline-flex items-center gap-x-1.5 font-semibold
        ${variantBtn[variant]} ${sizeBtn[size]}
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
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
