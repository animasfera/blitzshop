import { Ctx } from "blitz"
import i18n from "../i18n"

export class TicketsNotRefundableError extends Error {
  message: "Билеты не подлежат возврату"
}
export class DataHasChangedError extends Error {
  message = "Данные изменились"
}
export class LoginProhibitedError extends Error {
  message = "Ведутся технические работы, вход временно закрыт"
}

export class ErrorWithCode extends Error {
  code: string | undefined
  constructor(msg?: string, code?: string) {
    super(msg)
    this.code = code
  }
}

export const doError = async (code, ctx?: Ctx): Promise<ErrorWithCode> => {
  const locale = ctx?.session && ctx.session.user ? ctx.session.user.locale : "en"
  await i18n.changeLanguage(locale)
  const errorParts = code.split(".")
  const translationNamespace = errorParts[0]
  const errorCode = errorParts[1]
  await i18n.loadNamespaces([translationNamespace])
  return new ErrorWithCode(i18n.t(`${translationNamespace}:errors.${errorCode}`) as string, code)
}
