import { useTranslation } from "react-i18next"
import { Cart, CartToItem, Image, ImageToItem, Item, Price } from "db"

import { Button } from "src/core/tailwind-ui/application-ui/elements/buttons/Button"
import { CartOrderPrice, CartOrderPriceProps } from "src/carts/components/CartOrderPrice"

interface CartOrderProps {
  cart: Cart & {
    amount: Price
    cartToItems: (CartToItem & {
      item: Item & { amount: Price; coverImage: ImageToItem & { image: Image } }
    })[]
  }
  isLoading: boolean
}

export const CartOrder = (props: CartOrderProps) => {
  const { cart, isLoading } = props

  const { t } = useTranslation(["pages.cart"])

  const orderPrices: CartOrderPriceProps[] = [
    {
      title: t("order.summary.subtotal"),
      price: { amount: cart.amount.amount, currency: cart.amount.currency },
      border: true,
    },
    {
      title: t("order.summary.shipping.title"),
      // TODO: добавить расчет
      price: { amount: cart.amount.amount * 0.02, currency: cart.amount.currency },
      link: { href: "#", description: t("order.summary.shipping.description") },
      border: true,
    },
    {
      title: t("order.summary.tax.title"),
      // TODO: добавить расчет
      price: { amount: cart.amount.amount * 0.1, currency: cart.amount.currency },
      link: { href: "#", description: t("order.summary.tax.description") },
      border: true,
    },
    {
      title: t("order.summary.total"),
      price: {
        // TODO: добавить расчет
        amount: cart.amount.amount + cart.amount.amount * 0.02 + cart.amount.amount * 0.1,
        currency: cart.amount.currency,
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
      <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
        {t("order.title")}
      </h2>

      <div className="flex flex-col gap-y-4 ">
        <dl className="py-4 space-y-4">
          {orderPrices.map(({ title, price, link, border, size }, index) => {
            return (
              <CartOrderPrice
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

export default CartOrder
