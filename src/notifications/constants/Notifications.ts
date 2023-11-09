import { Routes } from "@blitzjs/next"
import { NotificationType } from "@prisma/client"
import { currencyFormat } from "src/core/helpers/Helpers"
import { DateTime } from "luxon"

export const Notifications = {
  payoutFailedMoneyAccountIsMissing: "payoutFailedMoneyAccountIsMissing",
  payoutFailedMoneyAccountIsChecking: "payoutFailedMoneyAccountIsChecking",
  payoutFailedMoneyAccountIsInvalid: "payoutFailedMoneyAccountIsInvalid",
  payoutFailedBankIsInvalid: "payoutFailedBankIsInvalid",
  payoutFailedCardIsInvalid: "payoutFailedCardIsInvalid",
  payoutFailedCardIsMissing: "payoutFailedCardIsMissing",
}

const origin = process.env.SITE_URL
const siteName = process.env.SITE_NAME
const slotDateString = (slot) =>
  DateTime.fromJSDate(slot.startsAt).toLocaleString(DateTime.DATE_MED)

export const NotificationMessages = {
  forgotPassword: {
    type: NotificationType.info,
    subject: "Восстановление пароля",
    message: ({ token }: { token: string }) => {
      const resetUrl = `${origin}/reset-password?token=${token}`

      return `Вы запросили сброс пароля на сайте ${siteName}.
Перейдите по следующей ссылке: ${resetUrl}
`
    },
  },

  addReview: {
    type: NotificationType.info,
    subject: "Пожалуйста, оставьте ваш отзыв",
    message: ({ url }) => `Спасибо, что сыграли в Лилу!
Как все прошло?
Пожалуйста, оставьте <a href=\"${url}\">ваш отзыв</a>.`,
  },

  newBookingMailer: {
    type: NotificationType.info,
    subject: "Куплены билеты на вашу игру",
    message: ({ slot, numTickets, amount }) => `Новое бронирование билетов на вашу игру ${
      slot.title
    } / ${slotDateString(slot)}
Количество билетов: ${numTickets}
Сумма: ${amount}
`,
  },

  confirmEmailAddress: {
    type: NotificationType.warning,
    subject: "Подтвердите e-mail адрес",
    message: ({ token }) => {
      const url = `${origin}/confirm-email`
      return `Для завершения регистрации, пожалуйста, <a href="${url}">подтвердите ваш e-mail</a>.`
    },
    mail: ({ token }: { token: string }) => {
      const autoconfirmEmailUrl = `${origin}/autoconfirm-email?token=${token}`
      const confirmEmailUrl = `${origin}/confirm-email`
      return `Спасибо за регистрацию на сайте ${siteName}!
Для активации аккаунта вам нужно подтвердить ваш адрес e-mail.
Для этого введите следующий код на странице подтверждения: ${token}
Или просто нажмите на эту ссылку: ${autoconfirmEmailUrl}`
    },
  },

  payoutFailedMoneyAccountIsMissing: {
    type: NotificationType.error,
    subject: "Мы не смогли отправить вам деньги",
    message: () =>
      "Нам не удалось отправить вам деньги.\n\n" +
      "Причина: у вас не заполнен платежный профиль.\n\n " +
      'Зайдите в своем аккаунте в раздел "Выплаты", чтобы заполнить его.',
  },
  payoutFailedMoneyAccountIsChecking: {
    type: NotificationType.error,
    subject: "Мы не смогли отправить вам деньги",
    message: () =>
      "В данный момент мы не можем отправить вам деньги, т.к. не завершена проверка вашего платежного профиля.\n\n" +
      "Мы завершим проверку в ближайшее время.",
  },
  payoutFailedMoneyAccountIsInvalid: {
    type: NotificationType.error,
    subject: "Мы не смогли отправить вам деньги",
    message: () =>
      "Нам не удалось отправить вам деньги.\n\n" +
      "Причина: некорректные данные в платежном профиле.\n\n " +
      'Пожалуйста, зайдите в своем аккаунте в раздел "Выплаты" и исправьте указанную проблему.',
  },
  payoutFailedBankIsInvalid: {
    type: NotificationType.error,
    subject: "Мы не смогли отправить вам деньги",
    message: () =>
      "Нам не удалось отправить вам деньги.\n\n" +
      "Причина: некорректные реквизиты банковского счета.\n\n " +
      'Пожалуйста, зайдите в своем аккаунте в раздел "Выплаты" и исправьте указанную проблему.',
  },
  payoutFailedCardIsInvalid: {
    type: NotificationType.error,
    subject: "Мы не смогли отправить вам деньги",
    message: () =>
      "Нам не удалось отправить вам деньги.\n\n" +
      "Причина: карта, привязанная к платежному профилю, не может быть использована для выплат.\n\n " +
      'Пожалуйста, зайдите в своем аккаунте в раздел "Выплаты" и привяжите другую карту.',
  },
  payoutFailedCardIsMissing: {
    type: NotificationType.error,
    subject: "Мы не смогли отправить вам деньги",
    message: () =>
      "Нам не удалось отправить вам деньги.\n\n" +
      "Причина: у вас нет добавлена банковская карта для выплат.\n\n " +
      'Пожалуйста, зайдите в своем аккаунте в раздел "Выплаты" и добавьте карту.',
  },
  moneyAccountApproved: {
    type: NotificationType.success,
    subject: "Ваш платежный профиль активирован",
    message: () => {
      return `Ваш платежный профиль был проверен и актирован. Теперь вы можете добавлять игры!`
    },
  },
  payout: {
    type: NotificationType.success,
    message: ({ amount, method }: { amount: number; method: "card" | "bankRu" | "bank" }) => {
      const methodString = method === "card" ? "вашу карту" : "ваш банковский счет"
      return `Мы отправили ${currencyFormat(amount)} на ${methodString}.
Спасибо, что вы с нами!`
    },
  },
  refundComment: {
    type: NotificationType.info,
    subject: "Новый комментарий в запросе на возврат",
    message: ({ from, comment, url }: { from: string; comment: string; url: string }) => {
      return `Добавлен новый комментарий от пользователя ${from}
в запросе на возврат средств <a href="${url}">${url}</a> :

"${comment}"
    `
    },
  },
  refundRequest: {
    type: NotificationType.warning,
    subject: `Поступил запрос на возврат денег`,
    message: ({
      user,
      slot,
      refund,
      comment,
    }: {
      user: { id: number; email: string }
      slot: any
      refund: any
      comment: string
    }) => {
      const url = origin + Routes.ShowRefundPage({ refundId: refund.id }).pathname

      return `Поступил запрос на возврат денег за игру ${slot.title} / ${slotDateString(slot)}.

Причина: ${refund.reason}
Комментарий: "${comment}"

Перейдите по следующей ссылке, чтобы ответить: ${url}
`
    },
  },
  refundApproved: {
    type: NotificationType.success,
    subject: "Ваш запрос на возврат был одобрен",
    message: () => {
      ;`Ваш запрос на возврат был одобрен ведущим. В ближайшее время мы вернем деньги на вашу карту.`
    },
  },
  refundRejected: {
    type: NotificationType.info,
    subject: "Ваш запрос на возврат был отклонен",
    message: () => {
      ;`Ваш запрос на возврат был отклонен ведущим. Если у вас остались вопросы, вы можете задать их ведущему.`
    },
  },
  slotCanceledToBuyer: {
    type: NotificationType.warning,
    subject: "Игра отменена организатором",
    message: ({ slot }) => {
      return `Игра, на которую вы купили билеты, была отменена организатором:
${slot.title} / ${slotDateString(slot)}

В ближайшее время мы вернем деньги на карту, с которой была совершена покупка.
`
    },
  },
  slotFinishedSales: {
    type: NotificationType.info,
    subject: "Завершена продажа билетов на вашу игру",
    message: ({ slot }: { slot: any }) =>
      `Завершена продажа билетов на вашу игру ${slot.title} / ${slotDateString(slot)}.`,
  },
  slotFinishedToPlayer: {
    type: NotificationType.info,
    subject: "Игра завершена",
    message: ({ slot }: { slot: any }) => `Завершена игра ${slot.title} / ${slotDateString(slot)}.
Спасибо вам, что сыграли в Лилу!
`,
  },
  slotStarted: {
    type: NotificationType.info,
    subject: "Игра начата",
    message: ({ slot }: { slot: any }) => {
      return `Начата игра ${slot.title} / ${slotDateString(slot)}.`
    },
  },
  slotStartedSales: {
    type: NotificationType.info,
    subject: "Начата продажа билетов",
    message: ({ slot }: { slot: any }) =>
      `Начата продажа билетов на вашу игру ${slot.title} / ${slotDateString(slot)}.`,
  },
  slotStoppedNoSales: {
    type: NotificationType.error,
    subject: "Ваша игра отменена из-за отсутствия продаж",
    message: ({ slot }: { slot: any }) =>
      `Ваша игра ${slot.title} / ${slotDateString(slot)} отменена из-за отсутствия продаж.`,
  },
}
