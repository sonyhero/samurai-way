import React from 'react'

export const Message = (props: MessageType) => {
  return <div>{props.messageText}</div>
}

//Types
type MessageType = {
  id: number
  messageText: string
}
