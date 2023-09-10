import { FC, memo } from 'react'
import { ChatMessageAPIType } from '../../../../api/chat-api'

export const ChatMessage: FC<ChatMessagePropsType> = memo(({ messageBody }) => {
  const { message, photo, userName } = messageBody
  return (
    <div>
      <img src={photo} alt={'photo'} />
      <div>{userName}</div>
      <div>{message}</div>
    </div>
  )
})
//types
type ChatMessagePropsType = {
  messageBody: ChatMessageAPIType
}
