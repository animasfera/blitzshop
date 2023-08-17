import React from "react"

interface HeadingSectionProps {
  title: string
  description?: string
  label?: string
}

export const HeadingSection = (props: HeadingSectionProps) => {
  const { title, description, label } = props

  return (
    <div className="pb-4">
      <div className="flex flex-wrap items-baseline">
        <h3 className="mb-0 font-semibold leading-6 text-gray-900">
          {title}
          {label && <span className="ml-2 mt-1 truncate text-gray-500">{label}</span>}
        </h3>
      </div>
      {description && <p className="m-0 mt-1 max-w-4xl text-sm text-gray-500">{description}</p>}
    </div>
  )
}

export default HeadingSection
