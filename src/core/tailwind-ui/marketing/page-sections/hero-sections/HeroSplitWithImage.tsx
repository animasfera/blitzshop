import React from "react"
import Link from "next/link"
import Image from "next/image"

interface HeroSplitWithImageProps {
  title: string
  subtitle?: string
  button?: { text: string; href: string }
  image: string
}

export const HeroSplitWithImage = (props: HeroSplitWithImageProps) => {
  const { title, subtitle, button, image } = props

  return (
    <section aria-labelledby={title} className="relative">
      <div aria-hidden="true" className="absolute hidden h-full w-1/2 bg-gray-100 lg:block" />
      <div className="relative bg-gray-100 lg:bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:px-8">
          <div className="mx-auto max-w-2xl py-24 lg:max-w-none lg:py-64">
            <div className="lg:pr-16">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
                {title}
              </h1>
              {subtitle && <p className="mt-4 text-xl text-gray-600">{subtitle}</p>}
              {
                // TODO: после мёржда кнопок добавить ее сюда
                // https://leela.jetbrains.space/p/shop/issues/30
              }
              {button && (
                <div className="mt-6">
                  <Link
                    href={button.href}
                    className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 font-medium text-white hover:bg-indigo-700"
                  >
                    {button.text}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="h-48 w-full sm:h-64 lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-1/2">
        <Image
          src={image}
          alt={title}
          width={800}
          height={500}
          className="h-full w-full object-cover object-center"
        />
      </div>
    </section>
  )
}

export default HeroSplitWithImage
