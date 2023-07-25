import React from "react"
import { HStack, Button } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"

export const Pagination = (props) => {
  const { page, hasMore, parent, onChange, ...rest } = props

  if (!(page > 0 || hasMore)) {
    return <></>
  }

  return (
    <HStack spacing={3} mt={6}>
      <Button
        disabled={props.page === 0}
        onClick={() => {
          onChange(page - 1)
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>
      <Button
        disabled={!props.hasMore}
        onClick={() => {
          onChange(page + 1)
        }}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </HStack>
  )
}

export default Pagination
