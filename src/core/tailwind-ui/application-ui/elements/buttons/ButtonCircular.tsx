import React from "react"

interface ButtonCircularProps {
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary" | "soft"
  // TODO: убрать пропс когда будет готово переключение темы
  theme?: "dark"
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  icon: JSX.Element
  disabled?: boolean
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export const ButtonCircular = (props: ButtonCircularProps) => {
  const {
    type = "button",
    variant = "primary",
    theme,
    size = "md",
    icon,
    disabled,
    className,
    onClick,
  } = props

  const sizeBtn = {
    xs: "p-1",
    sm: "p-1.5",
    md: "p-2",
    lg: "p-2.5",
    xl: "p-3",
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
      className={`transition-all ease-in-out duration-300 rounded-full shadow-sm w-max
        ${variantBtn[variant]} ${sizeBtn[size]}
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  )
}

export default ButtonCircular

/*
example:
  <ButtonCircular
    type={"button"}
    variant={"primary"}
    size={"xs"}
    icon={<BellIcon className="h-5 w-5" aria-hidden="true" />}
    disabled
    className={""}
    handleClick={() => console.log("click")}
  />
*/
