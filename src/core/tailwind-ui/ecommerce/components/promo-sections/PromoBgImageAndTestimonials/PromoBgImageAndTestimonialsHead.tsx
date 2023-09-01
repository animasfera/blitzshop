import React from "react"

interface PromoBgImageAndTestimonialsHeadProps {
  title: string
  subtitle?: string
  button?: { text: string; href: string }
}

export const PromoBgImageAndTestimonialsHead = (props: PromoBgImageAndTestimonialsHeadProps) => {
  const { title, subtitle, button } = props

  return (
    <section className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-32 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        {subtitle && <p className="mx-auto mt-4 max-w-xl text-xl text-gray-600">{subtitle}</p>}
        {button && (
          <a
            href={button.href}
            className="mt-6 inline-block w-full rounded-md border border-transparent bg-gray-900 px-8 py-3 font-medium text-white hover:bg-gray-800 sm:w-auto"
          >
            {button.text}
          </a>
        )}
      </div>
    </section>
  )
}

export default PromoBgImageAndTestimonialsHead
