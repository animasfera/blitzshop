import { SortableGallery } from "src/core/components/gallery/MasonryGallery"
import { Dropzone } from "src/core/components/form/Dropzone"
import { useEffect, useState } from "react"

export const SortableGalleryWithDropzone = (props) => {
  const { onUpload, onSort, onDelete, s3Path } = props
  const [items, setItems] = useState([...props.items])
  useEffect(() => {
    setItems(props.items)
  }, [props])

  const uploadHandler = (image) => {
    console.log("uploadHandler")
    console.log(image)
    onUpload && onUpload(image)
    setItems((oldItems) => {
      return [...oldItems, image]
    })
  }
  return (
    <>
      <SortableGallery items={items} onSort={onSort} canDelete={true} onDelete={onDelete} />
      <Dropzone
        s3path={s3Path}
        onUpload={uploadHandler}
        versions={{
          original: { w: 1024, h: 1024, fit: "inside" },
          sm: { w: 128, h: 128, fit: "cover" },
          xs: { w: 64, h: 64, fit: "cover" },
          md: { w: 256, h: 256, fit: "cover" },
          lg: { w: 512, h: 0, fit: "inside" },
          xl: { w: 812, h: 0, fit: "inside" },
        }}
      />
    </>
  )
}
