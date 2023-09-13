import { useEffect } from 'react'
import { withAuthRedirect } from '../../../../hoc/withAuthRedirect'
import { useAppDispatch } from '../../../../app/store'
import { startMessagesListening, stopMessagesListening } from '../model/chat-reducer'
import { ChatMessages } from './Chat/ChatMessages/ChatMessages'
import { AddChatMessageForm } from './Chat/AddChatMessageForm/AddChatMessageForm'
import s from './ChatPage.module.scss'

const ChatPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
    }
  }, [])

  return (
    <div className={s.container}>
      <ChatMessages />
      <AddChatMessageForm />
    </div>
  )
}

export default withAuthRedirect(ChatPage)
