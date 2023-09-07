import Link from "next/link"
import Image from "next/image"

interface HeaderLogoProps {
  title?: string
  href?: string
  src?: string
  alt?: string
}

export const HeaderLogo = (props: HeaderLogoProps) => {
  const {
    title = "shop",
    href = "/",
    src = "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600",
    alt = "logo",
  } = props

  return (
    <Link href={href} className="flex flex-shrink-0 items-center">
      <span className="sr-only">{title}</span>
      {src.indexOf("svg") !== -1 ? (
        <img src={src} alt={alt} className="h-8 w-auto" />
      ) : (
        <Image width={200} height={200} src={src} alt={alt} className="h-8 w-auto" />
      )}
    </Link>
  )
}

export default HeaderLogo
