import { useEffect } from 'react'
import { withAuthRedirect } from '../../../../hoc/withAuthRedirect'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { startMessagesListening, stopMessagesListening } from '../model/chat-reducer'
import { getStatus } from '../../../../app/selectors/chat-selector'
import { ChatMessages } from './Chat/ChatMessages/ChatMessages'
import { AddChatMessageForm } from './Chat/AddChatMessageForm/AddChatMEssageForm'

const ChatPage = () => {
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

export default withAuthRedirect(ChatPage)
