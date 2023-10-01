import { useTranslation } from "react-i18next"

interface ErrorTitleProps {
  statusCode?: number
  title?: string
  message?: string
}

export const ErrorTitle = (props: ErrorTitleProps) => {
  const { t } = useTranslation(["pages.errors"])

  const {
    statusCode = 404,
    title = t("main.header.title"),
    message = t("main.header.message"),
  } = props

  return (
    <>
      <p className="text-center text-base font-semibold text-indigo-600">{statusCode}</p>
      <h1 className="text-center mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        {title}
      </h1>
      {message && <p className="text-center mt-6 text-base leading-7 text-gray-600">{message}</p>}
    </>
  )
}

export default ErrorTitle
