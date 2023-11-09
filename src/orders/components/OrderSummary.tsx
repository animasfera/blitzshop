import { Order } from "db"

interface OrderSummaryProps {
  order: Order
}

export const OrderSummary = (props: OrderSummaryProps) => {
  // TODO: получать только данные по price
  const { order } = props

  return (
    <>
      <h3 className="sr-only">Summary</h3>

      <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
        <div className="flex justify-between">
          <dt className="font-medium text-gray-900">Subtotal</dt>
          <dd className="text-gray-700">$36.00</dd>
        </div>
        <div className="flex justify-between">
          <dt className="flex font-medium text-gray-900">
            Discount
            <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
              STUDENT50
            </span>
          </dt>
          <dd className="text-gray-700">-$18.00 (50%)</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium text-gray-900">Shipping</dt>
          <dd className="text-gray-700">$5.00</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium text-gray-900">Total</dt>
          <dd className="text-gray-900">$23.00</dd>
        </div>
      </dl>
    </>
  )
}

export default OrderSummary
