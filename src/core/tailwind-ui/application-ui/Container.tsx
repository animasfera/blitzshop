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
      mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8
      ${size === "sm" ? "max-w-3xl" : "sm:px-6 lg:px-8"}
      ${styles ?? ""}
      `}
    >
      {children}
    </div>
  )
}

export default Container
