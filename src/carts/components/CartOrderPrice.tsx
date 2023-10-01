import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid"

import { Money } from "src/core/components/Money"
import { CurrencyEnum } from "@prisma/client"

export interface CartOrderPriceProps {
  title: string
  price: { amount: number; currency: CurrencyEnum }
  link?: { href: string; description?: string }
  size?: "sm" | "md"
  border?: boolean
  styles?: string
}

export const CartOrderPrice = (props: CartOrderPriceProps) => {
  const { title, price, link, size = "sm", border, styles } = props

  const sizesCartOrderPrice = {
    sm: { dt: "text-sm text-gray-600", dd: "text-sm" },
    md: { dt: "text-base font-medium text-gray-900", dd: "text-base" },
  }

  return (
    <div
      className={`flex items-center justify-between ${
        border && "border-b border-gray-200 pb-4"
      } ${styles}`}
    >
      {link ? (
        <dt className={`flex items-center ${sizesCartOrderPrice[size].dt}`}>
          <span>{title}</span>
          <a href={link.href} className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
            {link.description && (
              <span className="sr-only">Learn more about how shipping is calculated</span>
            )}
            <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
          </a>
        </dt>
      ) : (
        <dt className={`flex items-center ${sizesCartOrderPrice[size].dt}`}>{title}</dt>
      )}
      <dd className={`text-gray-900 ${sizesCartOrderPrice[size].dd}`}>
        <Money amount={price.amount} currency={price.currency} />
      </dd>
    </div>
  )
}

export default CartOrderPrice
