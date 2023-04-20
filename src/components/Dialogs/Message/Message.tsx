import React from 'react';
import s from './../DialogsCSS.module.css'

type MessageType = {
    id: number
    messageText: string
}
export const Message = (props: MessageType) => {
    return (
        <div className={s.message}>{props.messageText}</div>
    )
}