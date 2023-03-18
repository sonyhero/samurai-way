import React from 'react';
import s from './DialogsCSS.module.css'
import {DialogItem} from './DialogItem/DialogsItem';
import {Message} from './Message/Message';
import {DialogItemType, MessageType} from '../../App';

export type DialogsPropsType = {
    dialogs: DialogItemType[]
    messages: MessageType[]
}

export const Dialogs = (props:DialogsPropsType) => {

    let dialogsDataMap = props.dialogs.map(
        d => <DialogItem name={d.name} id={d.id}/>
    )

    let messagesDataMap = props.messages.map(
        m => <Message message={m.message}/>
    )

    return (
        <div>
            Dialogs
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    {dialogsDataMap}
                </div>
                <div className={s.messages}>
                    {messagesDataMap}
                </div>
            </div>

        </div>
    )
}