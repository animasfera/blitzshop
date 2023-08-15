import { ReactElement, ReactNode } from "react"

type ContainerProps = {
  size?: "lg" | "sm"
  children: ReactElement[] | ReactElement | ReactNode
}
export default function Container({ children, size = "lg" }: ContainerProps) {
  return (
    <>
      <div
        className={"container mx-auto px-4 " + (size === "sm" ? "max-w-3xl" : "sm:px-6 lg:px-8")}
      >
        {children}
      </div>
    </>
  )
}
