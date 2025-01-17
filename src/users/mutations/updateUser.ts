import { resolver } from "@blitzjs/rpc"
import { hash256 } from "@blitzjs/auth"
import db from "db"
import { LocaleEnum, TokenTypeEnum, UserRoleEnum } from "@prisma/client"
import { UpdateUserSchema } from "../schemas"
import getUser from "../queries/getUser"
import i18n from "src/core/i18n"

export default resolver.pipe(
  resolver.zod(UpdateUserSchema),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    // TODO: allow this for admins
    if (id !== ctx.session.userId && ctx.session.role !== UserRoleEnum.ADMIN) {
      throw new Error("У вас нет прав на редактирование данного пользователя")
    }

    const userOld = await getUser({ id }, ctx)

    let { location, ..._data } = data as any

    let _location: any

    if (
      _data.emailLeelaCertificate
      // && userOld.emailLeelaCertificate !== data.emailLeelaCertificate
    ) {
      _data.emailLeelaCertificate = _data.emailLeelaCertificate.toLowerCase().trim()
    }

    if (location) {
      _location = await db.location.findFirst({
        where: {
          lat: location.lat,
          lng: location.lng,
        },
      })
      if (!_location) {
        _location = await db.location.create({ data: location })
      }
      if (!_location) {
        throw new Error("Не удалось добавить новый адрес. Попробуйте еще раз.")
      }
      _data.locationId = _location.id
    }

    if (_data.paymentMethodName) {
      _data.paymentMethod = {
        connect: {
          name: _data.paymentMethodName,
        },
      }
      delete _data.paymentMethodName
    }

    if (
      _data.idStatus
      // && _data.idStatus === UserIdStatus.rejected &&
      // userOld.idStatus !== _data.idStatus
    ) {
      _data.passportImgUrl = null
      _data.selfieImgUrl = null
    } else if (_data.passportImgUrl || _data.selfieImgUrl) {
      // _data.idStatus = UserIdStatus.checking
    }

    const user = await db.user.update({ where: { id }, data: _data, include: { location: true } })

    if (user.locale) {
      i18n.changeLanguage(user.locale)
    }

    if (user.id === ctx.session.userId) {
      await ctx.session.$create({
        userId: user.id,
        role: user.role as UserRoleEnum,
        timezone: user.timezone || "Etc/Greenwich",
        user: {
          id: user.id,
          role: user.role,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          avatarUrl: user.avatarUrl,
          timezone: user.timezone ?? "Etc/Greenwich",
          locale: user.locale || LocaleEnum.en,
          currency: user.currency,
          buyingInCountries: user.buyingInCountries,
          countryIsoCode: user.countryIsoCode,
        },
      })
    }

    return user
  }
)
