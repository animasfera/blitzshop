import React from "react"

interface HeadingBlockProps {
  title: string
  description?: string
  label?: string
}

export const HeadingBlock = (props: HeadingBlockProps) => {
  const { title, description, label } = props

  return (
    <div className="pb-2">
      <div className="flex flex-wrap items-baseline">
        <h4 className="text-base mb-0 font-semibold leading-6 text-gray-900">
          {title}
          {label && <span className="ml-2 mt-1 truncate text-gray-500">{label}</span>}
        </h4>
      </div>
      {description && <p className="m-0 mt-1 max-w-4xl text-sm text-gray-500">{description}</p>}
    </div>
  )
}

export default HeadingBlock
