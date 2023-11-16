import { useState } from "react"
import useScript from "./useScript"
import { Invoice, Order, User, PurchasedItem, PaymentMethod } from "@prisma/client"

export type OrderWithItemsAndUserAndInvoice = Order & {
  user: Pick<User, "email" | "firstName" | "lastName" | "id">
  invoice: Invoice | null
  items: PurchasedItem[]
}

export const useCloudpayments = () => {
  const [cpScriptLoaded, setCpScriptLoaded] = useState(false)
  const [delayedPayment, setDelayedPayment] = useState<
    | {
        invoice: Invoice
        order: OrderWithItemsAndUserAndInvoice
      }
    | undefined
  >()

  useScript("https://widget.cloudpayments.ru/bundles/cloudpayments.js", () => {
    setCpScriptLoaded(true)
    if (delayedPayment) {
      payByWidget(delayedPayment.invoice, delayedPayment.order)
    }
  })

  const payByWidget = (invoice: Invoice, order: OrderWithItemsAndUserAndInvoice) => {
    const receipt = {
      Items: order.items.map((item) => {
        return {
          label: item.title,
          price: item.price / 100, //цена
          quantity: item.qty, //количество
          amount: (item.price / 100) * item.qty, //сумма
          vat: 0, //ставка НДС
          method: 1, // тег-1214 признак способа расчета - признак способа расчета
          object: 4, // тег-1212 признак предмета расчета - признак предмета товара, работы, услуги, платежа, выплаты, иного предмета расчета
          measurementUnit: "шт", //единица измерения
        }
      }),
      email: order.user.email || "",
      taxationSystem: 1,
      customerInfo: order.user.firstName || "" + order.user.lastName || "",
      customerInn: "",
      isBso: false, //чек является бланком строгой отчётности
      AgentSign: 6, //признак агента, тег ОФД 1057
      AgentData: {
        AgentOperationName: null, // наименование операции банковского платежного агента или банковского платежного субагента, тег ОФД 1044
        PaymentAgentPhone: null, // телефон платежного агента, тег ОФД 1073
        PaymentReceiverOperatorPhone: null, // телефон оператора по приему платежей, тег ОФД 1074
        TransferOperatorPhone: null, // телефон оператора перевода, тег ОФД 1075
        TransferOperatorName: null, // наименование оператора перевода, тег ОФД 1026
        TransferOperatorAddress: null, // адрес оператора перевода, тег ОФД 1005
        TransferOperatorInn: null, // ИНН оператора перевода, тег ОФД 1016
      },
      PurveyorData: {
        Phone: process.env.NEXT_PUBLIC_COMPANY_RU_PHONE || "", // телефон поставщика, тег ОФД 1171
        Name: process.env.NEXT_PUBLIC_COMPANY_RU_NAME,
        Inn: process.env.NEXT_PUBLIC_COMPANY_RU_INN, // ИНН поставщика, тег ОФД 1226
      },
      amounts: {
        electronic: invoice.amount / 100, // Сумма оплаты электронными деньгами
        advancePayment: 0.0, // Сумма из предоплаты (зачетом аванса) (2 знака после запятой)
        credit: 0.0, // Сумма постоплатой(в кредит) (2 знака после запятой)
        provision: 0.0, // Сумма оплаты встречным предоставлением (сертификаты, др. мат.ценности) (2 знака после запятой)
      },
    }

    // @ts-ignore
    var widget = new cp.CloudPayments()
    widget.pay(
      "charge", // или 'AUTH'
      {
        //options
        publicId: process.env.NEXT_PUBLIC_CP_USERNAME, //id из личного кабинета
        description: "Оплата заказа №" + order.id + " по счету №" + invoice.id, //назначение
        amount: invoice.amount / 100, //сумма
        currency: "RUB", //валюта
        accountId: order.user.id, //идентификатор плательщика (необязательно)
        invoiceId: invoice.id, //номер заказа  (необязательно)
        email: order.user.email || "", //email плательщика (необязательно)
        skin: "mini", //дизайн виджета (необязательно)
        data: {
          CloudPayments: {
            CustomerReceipt: receipt, //онлайн-чек
          },
        },
      },
      {
        onSuccess: (options) => {
          //действие при успешной оплате
          window.location.href = "/orders/" + order.id + "?success=1"
        },
        onFail: () => {},
      }
    )
  }

  return {
    cloudpaymentsApiloaded: cpScriptLoaded,
    pay: (invoice: Invoice, order: OrderWithItemsAndUserAndInvoice) => {
      if (!cpScriptLoaded) {
        setDelayedPayment({
          invoice,
          order,
        })
      } else {
        payByWidget(invoice, order)
      }
    },
  }
}
