export const getPayoutAmountAndFee = ({
  amountGross,
  feeCoef,
  feeFixed = 0,
  feeTotal = 0,
}: {
  amountGross: number
  feeCoef?: number
  feeFixed?: number
  feeTotal?: number
}) => {
  let amountNet

  if (!feeTotal && feeCoef) {
    feeTotal = Math.ceil(amountGross * feeCoef) + feeFixed
  }

  amountNet = amountGross - feeTotal

  return {
    feeTotal,
    amountNet,
  }
}
