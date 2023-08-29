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
      className={`container mx-auto max-w-screen-xxl px-4 ${
        size === "sm" ? "max-w-3xl" : "sm:px-6 lg:px-8"
      }
      ${styles ?? ""}`}
    >
      {children}
    </div>
  )
}

export default Container
