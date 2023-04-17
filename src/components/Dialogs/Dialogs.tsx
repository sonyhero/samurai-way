import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './DialogsCSS.module.css'
import {DialogItem} from './DialogItem/DialogsItem';
import {Message} from './Message/Message';
import {ActionsTypes, DialogsPageType, StoreType} from '../../redux/state';
import {addMessageAC, updateNewMessageTextAC} from '../../redux/dialogs-reducer';


type DialogsPropsType = {
    dialogsPage: DialogsPageType
    addMessage: () => void
    changeMassage: (newMessageText: string) => void
}

export const Dialogs = (props: DialogsPropsType) => {

    const dialogsDataMap = props.dialogsPage.dialogs.map(
        d => <DialogItem name={d.name} id={d.id}/>
    )

    const messagesDataMap = props.dialogsPage.messages.map(
        m => <Message messageText={m.messageText} id={m.id}/>
    )

    const onAddMessage = () => {
        props.addMessage()
    }

    const onChangeMassage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newMessageText = e.currentTarget.value
        props.changeMassage(newMessageText)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') props.addMessage()
    }

    return (
        <div>
            Dialogs
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>{dialogsDataMap}</div>
                <div className={s.messages}>{messagesDataMap}
                    <div>
                <textarea
                    placeholder={'Enter message'}
                    value={props.dialogsPage.newMessageText}
                    onChange={onChangeMassage}
                    onKeyDown={onKeyDownHandler}
                />
                    </div>
                    <div>
                        <button onClick={onAddMessage}>Add message</button>
                    </div>
                </div>
            </div>
        </div>
    )
}