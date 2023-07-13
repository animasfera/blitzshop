import { Avatar } from "@chakra-ui/react"

export const UserAvatar = (props) => {
  let { size = "sm", src, name, ...rest } = props
  const sizes = {
    "2xs": "xs",
    xs: "xs",
    sm: "xs",
    md: "sm",
    lg: "sm",
    xl: "md",
    "2xl": "md",
  }
  src = src + (sizes[size] ? "-" + sizes[size] : "")

  return <Avatar name={name} src={src} size={size} {...rest} />
}
