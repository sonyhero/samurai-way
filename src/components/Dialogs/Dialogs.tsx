import React from 'react';
import s from './DialogsCSS.module.css'
import {DialogItem} from './DialogItem/DialogsItem';
import {Message} from './Message/Message';

export const Dialogs = () => {

    let dialogs = [
        {id:1, name: 'Dimych'},
        {id:2, name: 'Sveta'},
        {id:3, name: 'Viktor'},
        {id:4, name: 'Maks'},
        {id:5, name: 'Igor'},
    ]

    let messages = [
        {id:1, message: 'Hi'},
        {id:2, message: 'Anton'},
        {id:3, message: 'How are you'},
    ]

    let dialogsDataMap = dialogs.map(
        d=><DialogItem name={d.name} id={`${d.id}`}/>
    )

    let messagesDataMap = messages.map(
        m=><Message message={m.message}/>
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