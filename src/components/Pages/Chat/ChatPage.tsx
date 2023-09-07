import { Button } from '../../ui/button'
import { TextField } from '../../ui/textfield'
import { FC, useEffect, useState } from 'react'

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const ChatPage = () => {
  return (
    <div>
      <Chat />
    </div>
  )
}

const Chat = () => {
  return (
    <div style={{ width: '500px', border: '1px solid red' }}>
      Chat
      <ChatMessages />
      <AddChatMessageForm />
    </div>
  )
}
type ChatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}

const ChatMessages = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([])

  useEffect(() => {
    ws.addEventListener('message', (e) => {
      console.log(JSON.parse(e.data))
      setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)])
    })
  }, [])

  // const messages = null as null | ChatMessageType[]
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

const AddChatMessageForm = () => {
  return (
    <div>
      <TextField placeholder={'type message...'} />
      <Button>Send</Button>
    </div>
  )
}

export default ChatPage
