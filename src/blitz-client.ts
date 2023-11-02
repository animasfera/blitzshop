"use client"
import { AuthClientPlugin } from "@blitzjs/auth"
import { setupBlitzClient } from "@blitzjs/next"
import { BlitzRpcPlugin } from "@blitzjs/rpc"
import { authConfig } from "./blitz-auth-config"

export const { withBlitz, BlitzProvider, useSession } = setupBlitzClient({
  plugins: [AuthClientPlugin(authConfig), BlitzRpcPlugin({})],
})
