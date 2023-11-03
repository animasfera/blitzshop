import "src/core/styles/index.css"
import { Blitz } from "./Blitz"
import { getBlitzContext } from "src/blitz-server"

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // TODO uncomment this during build
  //const ctx = await getBlitzContext()

  return (
    <html lang="en">
      <body>
        <Blitz>{children}</Blitz>
      </body>
    </html>
  )
}
