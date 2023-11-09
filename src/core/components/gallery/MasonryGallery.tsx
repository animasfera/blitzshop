import { SortableContainer, SortableElement } from "react-sortable-hoc"

import { arrayMoveImmutable } from "array-move"
import { SortablePhoto } from "./Photo"
import React from "react"
import { Prisma } from "@prisma/client"
//import { Box, Flex, Grid, GridItem } from "@chakra-ui/react"
import "react-photoswipe/lib/photoswipe.css"

export function MasonryGallery(props) {
  const { onSort, canDelete, onDelete, items } = props
  // const [stateItems, setItems] = useState([...items])
  items.forEach((i, index) => (i.index = index))

  // useEffect(() => {
  //   setItems(items);
  // }, [items]);

  const _onDelete = (index) => {
    const _items = [...items]
    _items.splice(index, 1)
    onDelete(_items, index)
  }

  const SortableItem = SortableElement((item) => {
    const { _key, ...photo } = item
    return (
      <>
        <SortablePhoto
          {...photo}
          _key={_key}
          canDelete={true}
          onDelete={_onDelete}
          onClick={() => {}}
        />
      </>
    )
  })

  const SortableGallery = SortableContainer(({ items }) => {
    return <SGallery items={items} renderImage={(image) => <SortableItem {...image} />} />
  })

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const _items = arrayMoveImmutable(items, oldIndex, newIndex)
    onSort(_items)
    // setItems(_items)
  }

  const photos = [
    ...items.map((p: Prisma.JsonObject, i) => {
      return { ...p, key: String(i) }
    }),
  ]

  const SortableItem2 = SortableElement(
    ({ image, _key }) => {
      return <SortableItem {...image} _key={_key} />
    }
    // <Image src={image.src} width={'100px'} />
  )

  const SortableList2 = SortableContainer(({ items }) => {
    return (
      <div className="flex">
        {items.map((value, index) => (
          //@ts-ignore
          <SortableItem2 key={`item-${index}`} _key={index} index={index} image={value} />
        ))}
      </div>
    )
  })
  //@ts-ignore
  return <SortableList2 items={items} onSortEnd={onSortEnd} axis={"xy"} />
}

// export const _Gallery = (props) => {
//   const { renderImage, items } = props
//   const [lightboxIsOpen, setLightboxIsOpen] = useState(false)
//   // const [items, setItems] = useState([...props.items])
//   // useEffect(() => {
//   //   setItems(props.items);
//   // }, [props]);
//   const pswpImages = items.map((i) => {
//     return { ...i, w: i.width, h: i.height }
//   })

//   const images = items.slice(0, 5)
//   let templateRows, templateCols, rowSpan, colSpan, imageSize
//   switch (images.length) {
//     case 1:
//       templateRows = "1"
//       templateCols = "repeat(1, 1fr)"
//       rowSpan = () => "1"
//       colSpan = () => "1"
//       imageSize = (index) => [200, 420]
//       break
//     case 2:
//       templateRows = "1"
//       templateCols = "repeat(2, 1fr)"
//       rowSpan = () => "1"
//       colSpan = () => "1"
//       imageSize = (index) => [200, 420]
//       break
//     case 3:
//       templateRows = "1"
//       templateCols = "repeat(3, 1fr)"
//       rowSpan = () => "1"
//       colSpan = () => "1"
//       imageSize = (index) => [200, 420]
//       break
//     case 4:
//       templateRows = "1"
//       templateCols = "repeat(4, 1fr)"
//       rowSpan = () => "1"
//       colSpan = () => "1"
//       imageSize = (index) => [200, 420]
//       break
//     case 5:
//       templateRows = "repeat(2, 1fr)"
//       templateCols = "repeat(7, 1fr)"
//       rowSpan = (index) => ([0, 1, 3].includes(index) ? 2 : 1)
//       colSpan = (index) => ([0, 1, 3].includes(index) ? 2 : 1)
//       imageSize = (index) => ([0, 1, 3].includes(index) ? [200, 420] : [105, 210])
//   }

//   return (
//     <>
//       <Grid
//         className={"experience-gallery"}
//         h={["auto", "200px", "420px"]}
//         templateRows={["1", templateRows]}
//         templateColumns={["1", templateCols]}
//         gap={2}
//       >
//         {images.map((image, index) => {
//           return (
//             <GridItem
//               display={[index === 0 ? "block" : "none", "block"]}
//               key={index}
//               rowSpan={rowSpan(index)}
//               colSpan={colSpan(index)}
//               h={["auto", ...imageSize(index)]}
//             >
//               {renderImage ? (
//                 renderImage(image)
//               ) : (
//                 <Photo
//                   {...image}
//                   onClick={() => {
//                     setLightboxIsOpen(true)
//                   }}
//                 />
//               )}
//             </GridItem>
//           )
//         })}
//       </Grid>
//       <PhotoSwipe
//         isOpen={lightboxIsOpen}
//         items={pswpImages}
//         options={null}
//         onClose={() => {
//           setLightboxIsOpen(false)
//         }}
//       />
//     </>
//   )
// }

export const SGallery = (props) => {
  const { renderImage, items } = props

  const images = items.slice(0, 5)

  return (
    <div>
      {images.map((image, index) => {
        return <div key={image.index}>{renderImage(image)}</div>
      })}
    </div>
  )
}
export { MasonryGallery as SortableGallery }
