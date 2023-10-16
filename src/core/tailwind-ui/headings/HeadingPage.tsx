import React from "react"

interface HeadingPageProps {
  title: string
  subtitles?: Array<{
    icon?: JSX.Element
    text: string
  }>
}

export const HeadingPage = (props: HeadingPageProps) => {
  const { title, subtitles } = props

  return (
    <div className="min-w-0 flex-1 pb-4">
      <h2 className="m-0 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        {title}
      </h2>

      {!!subtitles && subtitles.length > 0 && (
        <ul className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          {subtitles.map(({ icon, text }, index) => (
            <li key={`${index}-${text}`} className="mt-2 flex items-center text-sm text-gray-500">
              {icon && icon}
              {text}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default HeadingPage
