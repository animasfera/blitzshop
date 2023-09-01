import React, { ReactElement } from "react"
import { useTranslation } from "react-i18next"

import { Money } from "src/core/components/Money"

interface CheckoutOrderInfoProps {
  children: ReactElement | ReactElement[]
}

export const CheckoutOrderInfo = (props: CheckoutOrderInfoProps) => {
  const { children } = props

  const { t } = useTranslation(["pages.checkout"])

  return (
    <>
      <dl>
        <dt className="text-sm font-medium">{t("order.amount")}</dt>
        <dd className="mt-1 text-3xl font-bold tracking-tight text-white">
          <Money
            // $232.00
            amount={23200}
            currency={"USD"}
          />
        </dd>
      </dl>

      {children}

      <dl className="space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium">
        <div className="flex items-center justify-between">
          <dt>{t("order.subtotal")}</dt>
          <dd>
            <Money
              // $570.00
              amount={57000}
              currency={"USD"}
            />
          </dd>
        </div>

        <div className="flex items-center justify-between">
          <dt>{t("order.shipping")}</dt>
          <dd>
            <Money
              // $25.00
              amount={2500}
              currency={"USD"}
            />
          </dd>
        </div>

        <div className="flex items-center justify-between">
          <dt>{t("order.taxes")}</dt>
          <dd>
            <Money
              // $47.60
              amount={4760}
              currency={"USD"}
            />
          </dd>
        </div>

        <div className="flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-white">
          <dt className="text-base">{t("order.total")}</dt>
          <dd className="text-base">
            <Money
              // $642.60
              amount={64260}
              currency={"USD"}
            />
          </dd>
        </div>
      </dl>
    </>
  )
}

export default CheckoutOrderInfo
