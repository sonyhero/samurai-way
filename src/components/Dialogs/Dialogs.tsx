import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './DialogsCSS.module.css'
import {DialogItem} from './DialogItem/DialogsItem';
import {Message} from './Message/Message';
import {DialogsPageType} from '../../App';

type DialogsPropsType = {
    dialogsPage: DialogsPageType
    addMessage: () => void
    updateNewMessageText: (newMessageText: string) => void
}

// type DialogsStateType = {
//     dialogs: DialogItemType[]
//     messages: MessageType[]
// }

export const Dialogs = (props:DialogsPropsType) => {

    // let dialogsDataMap = props.dialogs.map(
    //     d => <DialogItem name={d.name} id={d.id}/>
    // )
    const dialogsDataMap = props.dialogsPage.dialogs.map(
        d => <DialogItem name={d.name} id={d.id}/>
    )

    const messagesDataMap = props.dialogsPage.messages.map(
        m => <Message message={m.message} id={m.id}/>
    )

    const addMessage = () => {
        if (props.dialogsPage.newMessageText.trim() !== '')
            props.addMessage()
    }

    const onChangeMassage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessageText(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            addMessage()
        }
    }

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
            <div>
                <textarea onChange={onChangeMassage}
                          onKeyDown={onKeyDownHandler}
                          value={props.dialogsPage.newMessageText}
                />
            </div>
            <div>
                <button onClick={addMessage}>Add message</button>
            </div>
        </div>
    )
}