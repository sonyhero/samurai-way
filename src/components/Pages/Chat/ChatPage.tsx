import { Button } from '../../ui/button'
import { TextField } from '../../ui/textfield'
import { FC } from 'react'

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

const ChatMessages = () => {
  const messages: MessagesType[] = [
    { id: new Date(), text: 'hello' },
    { id: new Date(), text: 'hello' },
    { id: new Date(), text: 'hello' },
    { id: new Date(), text: 'hello' },
    { id: new Date(), text: 'hello' },
    { id: new Date(), text: 'hello' },
    { id: new Date(), text: 'hello' },
    { id: new Date(), text: 'hello' },
    { id: new Date(), text: 'hello' },
    { id: new Date(), text: 'hello' },
    { id: new Date(), text: 'hello' },
    { id: new Date(), text: 'hello' },
    { id: new Date(), text: 'hello' },
    { id: new Date(), text: 'hello' },
    { id: new Date(), text: 'hello' },
    { id: new Date(), text: 'hello' },
    { id: new Date(), text: 'hello' },
    { id: new Date(), text: 'hello' },
  ]
  const mappedMessages = messages.map((m) => <ChatMessage key={+m.id} text={m.text} />)
  return <div style={{ height: '300px', overflowY: 'auto' }}>{mappedMessages}</div>
}
type MessagesType = {
  id: Date
  text: string
}

const ChatMessage: FC<ChatMessagePropsType> = () => {
  return <div>message</div>
}
type ChatMessagePropsType = {
  text: any
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
