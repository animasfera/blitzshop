export async function register() {
  if (typeof window === "undefined") {
    setTimeout(async () => {
      await fetch(process.env.SITE_URL + "/api/queues/?secret=1ee1a")
    }, 2000)
  }
}
