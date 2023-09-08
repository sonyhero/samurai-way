import { Button } from '../../ui/button'
import { TextField } from '../../ui/textfield'
import { FC, useEffect, useState } from 'react'

const ChatPage = () => {
  return (
    <div>
      <Chat />
    </div>
  )
}

const Chat = () => {
  const [ws, setWs] = useState<WebSocket | null>(null)

  useEffect(() => {
    let webSocket: WebSocket
    const closeHandler = () => setTimeout(createChannel, 3000)
    function createChannel() {
      ws?.removeEventListener('close', closeHandler)
      ws?.close()
      webSocket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
      ws?.addEventListener('close', closeHandler)
      setWs(webSocket)
    }
    createChannel()
    return () => {
      ws?.removeEventListener('close', closeHandler)
      ws?.close()
    }
  }, [])

  return (
    <div style={{ width: '500px', border: '1px solid red' }}>
      Chat
      <ChatMessages ws={ws} />
      <AddChatMessageForm ws={ws} />
    </div>
  )
}
type ChatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}

const ChatMessages: FC<{ ws: WebSocket | null }> = ({ ws }) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([])

  useEffect(() => {
    const messageHandler = (e: MessageEvent) => setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)])
    ws?.addEventListener('message', messageHandler)
    return () => {
      ws?.removeEventListener('message', messageHandler)
    }
  }, [ws])

  const mappedMessages = messages?.map((m, index) => <ChatMessage key={index} message={m} />)
  return <div style={{ height: '300px', overflowY: 'auto' }}>{mappedMessages}</div>
}

const ChatMessage: FC<ChatMessagePropsType> = ({ message }) => {
  return (
    <div>
      <img src={message.photo} alt={'photo'} />
      <div>{message.userName}</div>
      <div>{message.message}</div>
    </div>
  )
}
type ChatMessagePropsType = {
  message: ChatMessageType
}

const AddChatMessageForm: FC<{ ws: WebSocket | null }> = ({ ws }) => {
  const [message, setMessage] = useState<string>('')
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

  useEffect(() => {
    const openHandler = () => setReadyStatus('ready')
    ws?.addEventListener('open', openHandler)
    return () => {
      ws?.removeEventListener('open', openHandler)
    }
  }, [ws])

  const sendMessage = () => {
    debugger
    if (!message) return
    ws?.send(message)
    setMessage('')
  }

  const onChangeHandler = (text: string) => {
    setMessage(text)
  }

  return (
    <div>
      <TextField onChangeText={onChangeHandler} value={message} placeholder={'type message...'} />
      <Button disabled={ws === null || readyStatus !== 'ready'} onClick={sendMessage}>
        Send
      </Button>
    </div>
  )
}

export default ChatPage
