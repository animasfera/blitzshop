import { useTranslation } from "react-i18next"
import { Cart, CartToItem, Image, ImageToItem, Item, Price } from "db"

import { Button } from "src/core/tailwind-ui/application-ui/elements/buttons/Button"
import { CartTotalsItem, CartOrderPriceProps } from "src/carts/components/CartTotalsItem"
import { cartClient } from "../../core/hooks/useCart"
import { CurrencyEnum } from "@prisma/client"

interface CartOrderProps {
  total: number
  isLoading: boolean
}

export const CartTotal = (props: CartOrderProps) => {
  const { total, isLoading } = props

  const { t } = useTranslation(["pages.cart"])

  const orderPrices: CartOrderPriceProps[] = [
    {
      title: t("order.summary.total"),
      price: {
        amount: total,
        currency: CurrencyEnum.EUR,
      },
      size: "md",
      border: false,
    },
  ]

  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      {/*<h2 id="summary-heading" className="text-lg font-medium text-gray-900">*/}
      {/*  {t("order.title")}*/}
      {/*</h2>*/}

      <div className="flex flex-col gap-y-4 ">
        <dl className="py-4 space-y-4">
          {orderPrices.map(({ title, price, link, border, size }, index) => {
            return (
              <CartTotalsItem
                key={`${index}-${title}`}
                title={title}
                price={price}
                link={link}
                border={border}
                size={size}
              />
            )
          })}
        </dl>

        <Button
          buttonText={t("order.button")}
          size={"xl"}
          styles={"justify-center"}
          disabled={isLoading}
        />
      </div>
    </section>
  )
}

export default CartTotal