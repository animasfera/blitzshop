import React, { useState } from "react"
// import { Box, CloseButton } from "@chakra-ui/react"

const imgWithClick = { cursor: "pointer" }

// export const Photo = (props) => {
//   const { index, onClick, url, width, height, direction, top, left, margin, canDelete, onDelete } =
//     props

//   const imgStyle = {
//     margin: margin,
//     width: "auto",
//   } as any

//   if (direction === "column") {
//     imgStyle.position = "absolute"
//     imgStyle.left = left
//     imgStyle.top = top
//   }

//   return (
//     <Box h={"100%"}>
//       <Image
//         style={imgStyle}
//         url={url}
//         width={"auto"}
//         height={"auto"}
//         maxWidth={"100%"}
//         maxHeight={"100%"}
//         minWidth={"100%"}
//         minHeight={"100%"}
//         onClick={onClick}
//         alt="img"
//         objectFit={"cover"}
//       />
//     </Box>
//   )
// }

export const SortablePhoto = (props) => {
  const {
    index,
    onClick,
    photo,
    direction,
    image,
    width,
    height,
    _key: key,
    top,
    left,
    margin,
    canDelete,
    onDelete,
  } = props
  const [deleted, setDeleted] = useState(false)

  const imgStyle = {
    // margin: margin,
    // flexBasis: '150px',
    // maxHeight: '250px',
    width: "auto",
  } as any

  if (direction === "column") {
    // imgStyle.position = "absolute"
    // imgStyle.left = left
    // imgStyle.top = top
  }

  const contStyle = {
    width: "100px",
    height: "100px",
    position: "relative",
    padding: "3px",
    display: deleted ? "none" : "block",
  } as React.CSSProperties

  const overlayDeleteStyle = {
    position: "absolute",
    top: "5px",
    right: "5px",
    // display: 'none'
  } as React.CSSProperties

  const handleClick = (event) => {
    onClick(event, { photo, index })
    return true
  }

  return (
    <div className="h-full" key={key} style={contStyle}>
      <img
        className="h-full"
        src={image.url}
        onClick={onClick ? handleClick : () => {}}
        // alt="img"
      />

      <div
        style={overlayDeleteStyle}
        onClick={() => {
          setDeleted(true)
          onDelete(Number(key))
        }}
      >
        <button className="bg-gray-100 opacity-50 hover:opacity-100 hover:bg-gray-100 text-gray-700 font-bold px-2 rounded-full">
          X
        </button>
      </div>
    </div>
  )
}
