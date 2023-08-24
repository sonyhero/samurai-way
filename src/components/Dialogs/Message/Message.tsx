import React from 'react'
import s from './../DialogsCSS.module.css'

export const Message = (props: MessageType) => {
  return <div className={s.message}>{props.messageText}</div>
}

//Types
type MessageType = {
  id: number
  messageText: string
}
