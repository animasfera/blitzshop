import Pusher from "pusher"

class PusherServer {
  pusher: Pusher
  init() {
    this.pusher = new Pusher({
      appId: process.env.PUSHER_SERVER_ID ?? "",
      key: process.env.PUSHER_SERVER_KEY ?? "",
      secret: process.env.PUSHER_SERVER_SECRET ?? "",
      cluster: "ap1",
      useTLS: true,
    })
    return this.pusher
  }
  get() {
    return this.pusher
  }
}

const pusher = new PusherServer()
const pusherServerInstance = pusher.init()

export const getPusherServer = () => pusherServerInstance
