import { ErrorTitle } from "src/core/components/sections/Error/ErrorTitle"
import { ErrorRedirect } from "src/core/components/sections/Error/ErrorRedirect"

interface ErrorSectionProps {
  header?: {
    statusCode?: number
    title?: string
    message?: string
  }
  link?: {
    href: string
    text: string
  }
}

export const ErrorSection = (props: ErrorSectionProps) => {
  const { header, link } = props

  return (
    <section className="min-h-[calc(100vh-(60px+300px))] mt-10 flex flex-col justify-center items-center ">
      <ErrorTitle statusCode={header?.statusCode} message={header?.message} title={header?.title} />
      <ErrorRedirect link={link} />
    </section>
  )
}

export default ErrorSection
