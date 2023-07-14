import { Ctx, NotFoundError, MiddlewareResponse } from "blitz"
import { getSession } from "@blitzjs/auth"
import { UserRoleEnum } from "@prisma/client"
import { IncomingMessage as Req, ServerResponse as Res } from "http"
import httpMocks from "node-mocks-http"
import db, { User } from "db"

// This import is crucial, as it modifies global state by calling sessionMiddleware
// Most importantly, this sets the isAuthorized method in global.sessionConfig
import "../../../next.config"

interface CreateMockContextOptions {
  user?: Partial<User>
  reqOptions?: httpMocks.RequestOptions
  resOptions?: httpMocks.ResponseOptions
}

// Based on https://github.com/blitz-js/blitz/issues/2654#issuecomment-904426530
// Creates a mock context for use in tests and scripts. Attempts to make it the
// "real deal" by calling the same initialization logic that creates actual
// session contexts.
export default async function createMockContext<C extends Ctx>({
  user,
  reqOptions,
  resOptions,
}: CreateMockContextOptions = {}) {
  const mocks = httpMocks.createMocks<any, any>(reqOptions, resOptions)
  const mockReq: Req = mocks.req
  const mockRes: MiddlewareResponse<C> = mocks.res

  // Ensures the response has the blitzCtx object which is required for
  // authorization checks
  await getSession(mockReq, mockRes)

  // Simulate login by saving public session data
  if (user) {
    // Need to use Object.assign instead of spread operator,
    // because $publicData is readonly (only has a getter)
    // make sure to add **your** session's public data
    Object.assign(mockRes.blitzCtx.session.$publicData, {
      userId: user.id,
      id: user.id,
      role: user.role,
      isAdmin: user.role === UserRoleEnum.ADMIN,
    })
  }

  return { req: mockReq, res: mockRes, ctx: mockRes.blitzCtx }
}

export const createAdminMockContext = async () => {
  const user = await db.user.findFirst({ where: { role: UserRoleEnum.ADMIN } })
  if (!user) {
    throw new NotFoundError()
  }
  const { ctx } = await createMockContext({ user })
  return ctx
}
