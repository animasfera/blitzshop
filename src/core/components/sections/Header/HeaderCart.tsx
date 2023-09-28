import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { ShoppingBagIcon } from "@heroicons/react/24/outline"
import { Cart, CartToItem } from "db"

import { Button } from "src/core/tailwind-ui/application-ui/elements/buttons/Button"

interface HeaderCartProps {
  cart: (Cart & { cartToItems: CartToItem[] }) | null
}

export const HeaderCart = (props: HeaderCartProps) => {
  const { cart } = props

  return (
    <div className="flow-root">
      <Link href={Routes.CartPage().href} className="group -m-2 flex items-center p-2">
        <Button
          variant={"soft"}
          startIcon={
            <ShoppingBagIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
          }
          buttonText={`${cart?.numItems ?? 0}`}
          styles={"bg-transparent"}
        />
        <span className="sr-only">items in cart, view bag</span>
      </Link>
    </div>
  )
}

export default HeaderCart
