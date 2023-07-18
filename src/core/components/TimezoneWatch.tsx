import { ReactElement, Suspense, useEffect } from "react"
import { useSession } from "@blitzjs/auth"

import { useTimezone } from "src/core/hooks/useTimezone"

export const TimezoneWatch = (): ReactElement => {
  const session = useSession()
  const timezoneCtx = useTimezone()

  useEffect(() => {
    timezoneCtx.setTimezone(session?.timezone ?? "Etc/Greenwich")
  }, [session.timezone, timezoneCtx])

  return <></>
}
