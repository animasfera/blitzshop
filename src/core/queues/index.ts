// import { initSlotsCron } from "./slots"
// import { initTransactionsCron } from "./transactions"
// import { initReportsCron } from "./reports"
import { initInvoicesCron } from "./invoices"
import { initMailsNewsletterCron } from "./mailsNewsletter"

export { MailsQueue } from "./mails"
export { InvoicesQueue } from "./invoices"
// export { SlotsQueue } from "./slots"
// export { TransactionsQueue } from "./transactions"
// export { ReportsQueue } from "./reports"
export { ImagesQueue } from "./images"
export { MailsNewsletterQueue } from "./mailsNewsletter"

export const init = () => {
  console.log("Starting Queues")
}

export const initCron = () => {
  console.log("Starting Cron Jobs")
  // initSlotsCron()
  // initTransactionsCron()
  // initReportsCron()
  initInvoicesCron()
  initMailsNewsletterCron()
}
