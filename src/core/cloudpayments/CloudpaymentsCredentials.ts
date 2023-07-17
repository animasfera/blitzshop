export const CloudpaymentsCredentials = {
  username: (process.env.NEXT_PUBLIC_CP_USERNAME as string) ?? "",
  password: (process.env.CP_PASSWORD as string) ?? "",
}

export const CloudpaymentsCredentialsForPayouts = {
  username: (process.env.NEXT_PUBLIC_CP_PAYOUTS_USERNAME as string) ?? "",
  password: (process.env.CP_PAYOUTS_PASSWORD as string) ?? "",
}
