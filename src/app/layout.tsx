import "src/core/styles/index.css"
import { Blitz } from "./Blitz"
import { getBlitzContext } from "@blitzjs/auth"

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const ctx = await getBlitzContext()
  const session = ctx.session
  return (
    <html lang="en">
      <body>
        <Blitz session={session}>{children}</Blitz>
      </body>
    </html>
  )
}
