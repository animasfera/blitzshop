import Pusher from "pusher-js"

class PusherClient {
  pusher: Pusher | null
  socketId: null | string
  init() {
    if (typeof window === "undefined" ? null : window) {
      Pusher.logToConsole = true
      this.pusher = new Pusher(process.env.PUSHER_SERVER_KEY ?? "", {
        cluster: "ap1",
      })
      this.pusher.connection.bind("connected", () => {
        if (this.pusher) {
          this.socketId = this.pusher.connection.socket_id
        }
      })
      return this.pusher
    } else {
      this.pusher = null
      return null
    }
  }
  get() {
    return { pusher: this.pusher, socketId: this.socketId }
  }
}

const pusher = new PusherClient()
pusher.init()

export const usePusher = () => pusher.get()
