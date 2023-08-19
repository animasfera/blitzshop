import React from "react"

export interface DataStats {
  name: string | number
  value?: string | number
  href?: string
}

interface StatsProps {
  title?: string
  subtitle?: string
  data: Array<DataStats>

  numColsLg?: number
  numColsSm?: number

  theme?: "dark"
}

const Stats = (props: StatsProps) => {
  const { title, subtitle, data, numColsLg = 3, numColsSm = 1, theme } = props

  return (
    <section>
      {title && (
        <div className="text-center my-4">
          <h2
            className={`${
              theme === "dark" ? "text-white" : "text-gray-900"
            } text-3xl font-bold tracking-tight sm:text-4xl`}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              } mt-4 text-lg leading-8`}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}

      <dl
        className={`
        grid grid-cols-1 gap-0.5 overflow-hidden text-center
        lg:grid-cols-${numColsLg} sm:grid-cols-${numColsSm}
      `}
      >
        {data.map(({ name, value, href }, index) => {
          if (href) {
            return (
              <a
                key={index}
                href={href}
                className={`${theme === "dark" ? "bg-white/5" : ""} flex flex-col p-8`}
              >
                <dt className={`${theme === "dark" ? "text-gray-300" : "text-gray-500"} text-sm`}>
                  {name}
                </dt>
                <dd
                  className={`${theme === "dark" ? "text-white" : "text-gray-900"} font-semibold`}
                >
                  {value}
                </dd>
              </a>
            )
          }

          return (
            <div
              key={index}
              className={`${theme === "dark" ? "bg-white/5" : ""} flex flex-col p-8`}
            >
              <dt className={`${theme === "dark" ? "text-gray-300" : "text-gray-500"} text-sm`}>
                {name}
              </dt>
              <dd className={`${theme === "dark" ? "text-white" : "text-gray-900"} font-semibold`}>
                {value}
              </dd>
            </div>
          )
        })}
      </dl>
    </section>
  )
}

export default Stats
