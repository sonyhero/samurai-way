const subscribers = {
  'message-received': [] as MessagesReceivedSubscriberType[],
  'status-changed': [] as StatusChangedSubscriberType[],
}
let ws: WebSocket

const notifySubscribesAboutStatus = (status: StatusType) => {
  subscribers['status-changed'].forEach((s) => s(status))
}

const closeHandler = () => {
  notifySubscribesAboutStatus('pending')
  setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data)
  subscribers['message-received'].forEach((s) => s(newMessages))
}

const openHandler = () => {
  notifySubscribesAboutStatus('ready')
}

const errorHandler = () => {
  notifySubscribesAboutStatus('error')
  console.error('REFRESH PAGE')
}

const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler)
  ws?.removeEventListener('message', messageHandler)
  ws?.addEventListener('open', openHandler)
  ws?.addEventListener('error', errorHandler)
}

function createChannel() {
  cleanUp()
  ws?.close()
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  notifySubscribesAboutStatus('pending')
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', messageHandler)
  ws.addEventListener('open', openHandler)
  ws.addEventListener('error', errorHandler)
}

export const chatAPI = {
  start() {
    createChannel()
  },
  stop() {
    subscribers['message-received'] = []
    subscribers['status-changed'] = []
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.close()
  },
  subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
    // @ts-ignore
    subscribers[eventName].push(callback)
    return () => {
      // @ts-ignore
      subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback)
    }
  },
  unSubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback)
  },
  sendMessage(message: string) {
    ws?.send(message)
  },
}
//Types
type EventsNamesType = 'message-received' | 'status-changed'
type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
export type StatusType = 'pending' | 'ready' | 'error'
export type ChatMessageAPIType = {
  message: string
  photo: string
  userId: number
  userName: string
}
