import { useEffect } from "react"

const useScript = (url, callback) => {
  useEffect(() => {
    const script = document.createElement("script")

    script.src = url
    script.async = true

    script.addEventListener("load", callback, { once: true })

    document.head.appendChild(script)

    // return () => {
    //   document.head.removeChild(script)
    // }
  }, [url])
}

export default useScript
