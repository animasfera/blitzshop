import { ReactElement, ReactNode } from "react"

interface ContainerProps {
  size?: "lg" | "sm"
  styles?: string
  children: ReactElement[] | ReactElement | ReactNode
}

export const Container = (props: ContainerProps) => {
  const { size = "lg", styles, children } = props

  return (
    <div
      className={`
      mx-auto px-4 pb-12
      ${size === "sm" ? "max-w-3xl" : "sm:px-6 lg:px-8"}
      ${styles ?? ""}
      `}
    >
      {children}
    </div>
  )
}

export default Container
