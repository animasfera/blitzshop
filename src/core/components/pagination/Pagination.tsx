import React from "react"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"

import ButtonLink from "src/core/components/buttons/ButtonLink"

interface PaginationProps {
  page: number
  countObjects: number
  itemsPerPage: number
  hasMore: boolean
  onChange: (page: number) => void
}

export const Pagination = (props: PaginationProps) => {
  const { page, countObjects, itemsPerPage, hasMore, onChange } = props

  const totalPages = Math.ceil(countObjects / itemsPerPage)
  const numPages = Array.from(Array(totalPages), (_, index) => index + 1)

  if (!(page > 0 || hasMore)) {
    return <></>
  }

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 mt-5">
      <ButtonLink
        buttonText={"Previous"}
        startIcon={faArrowLeft}
        disabled={page === 0}
        handleClick={() => onChange(page - 1)}
      />
      <div className="md:-mt-px md:flex gap-2">
        {numPages.map((num, index) => {
          // TODO: show not all page numbers: "1 2 3 ... 8 9 10"
          // https://tailwindui.com/components/application-ui/navigation/pagination

          return (
            <ButtonLink
              key={`${index}-${num}`}
              buttonText={num.toString()}
              active={num - 1 === page}
              disabled={page === num - 1}
              handleClick={() => onChange(num - 1)}
            />
          )
        })}
      </div>

      <ButtonLink
        buttonText={"Next"}
        endIcon={faArrowRight}
        className={"justify-end"}
        disabled={!hasMore}
        handleClick={() => onChange(page + 1)}
      />
    </nav>
  )
}

export default Pagination
