import { Button } from '../../../ui/button'
import { TextField } from '../../../ui/textfield'
import { FC, memo, UIEvent, useEffect, useRef, useState } from 'react'
import { ChatMessageAPIType } from '../api/chat-api'
import { withAuthRedirect } from '../../../../hoc/withAuthRedirect'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { sendMessage, startMessagesListening, stopMessagesListening } from '../model/chat-reducer'
import { getMessages, getStatus } from '../../../../app/selectors/chat-selector'

const ChatPage = () => {
  return (
    <div>
      <Chat />
    </div>
  )
}

const Chat = () => {
  const status = useAppSelector(getStatus)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
    }
  }, [])

  return (
    <div>
      {status === 'error' && <div>Some error occurred. Please refresh the page</div>}
      <div style={{ width: '500px', border: '1px solid red' }}>
        Chat
        <ChatMessages />
        <AddChatMessageForm />
      </div>
    </div>
  )
}

const ChatMessages = () => {
  const messagesAnchorRef = useRef<HTMLDivElement>(null)
  const messages = useAppSelector(getMessages)
  const [isAutoScrollIsActive, setIsAutoScrollIsActive] = useState(true)

  useEffect(() => {
    if (isAutoScrollIsActive) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const onScrollHandler = (e: UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget
    if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
      !isAutoScrollIsActive && setIsAutoScrollIsActive(true)
    } else {
      isAutoScrollIsActive && setIsAutoScrollIsActive(false)
    }
  }

  const mappedMessages = messages?.map((m, index) => <ChatMessage key={index} messageBody={m} />)

  return (
    <div onScroll={onScrollHandler} style={{ height: '300px', overflowY: 'auto' }}>
      {mappedMessages}
      <div ref={messagesAnchorRef}></div>
    </div>
  )
}

const ChatMessage: FC<ChatMessagePropsType> = memo(({ messageBody }) => {
  const { message, photo, userName } = messageBody
  return (
    <div>
      <img src={photo} alt={'photo'} />
      <div>{userName}</div>
      <div>{message}</div>
    </div>
  )
})

const AddChatMessageForm = () => {
  const status = useAppSelector(getStatus)
  const [value, setValue] = useState<string>('')
  const dispatch = useAppDispatch()

  const onChangeHandler = (text: string) => {
    setValue(text)
  }

  const addNewMessage = () => {
    if (!value) {
      return
    }
    dispatch(sendMessage(value))
    setValue('')
  }
  const onKeyPressHandler = () => {
    addNewMessage()
  }

  return (
    <div>
      <TextField
        onEnter={onKeyPressHandler}
        onChangeText={onChangeHandler}
        value={value}
        placeholder={'type message...'}
      />
      <Button disabled={status !== 'ready'} onClick={addNewMessage}>
        Send
      </Button>
    </div>
  )
}

//types
type ChatMessagePropsType = {
  messageBody: ChatMessageAPIType
}

export default withAuthRedirect(ChatPage)
