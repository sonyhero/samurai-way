import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './DialogsCSS.module.css'
import {DialogItem} from './DialogItem/DialogsItem';
import {Message} from './Message/Message';
import {MapDispatchToPropsType, MapStateToPropsType} from './DialogsContainer';

// type DialogsPropsType = {
//     addMessage: () => void
//     updateNewMessageText: (newMessageText: string) => void
//     dialogsPage: InitialDialogsReducerStateType
// }

type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType

export const Dialogs: React.FC<DialogsPropsType> = (props) => {

    const {addMessage,
        updateNewMessageText,
        dialogsPage
    } = props

    const dialogsDataMap = dialogsPage.dialogs.map(
        d => <DialogItem key={d.id} name={d.name} id={d.id}/>
    )

    const messagesDataMap = dialogsPage.messages.map(
        m => <Message key={m.id} messageText={m.messageText} id={m.id}/>
    )

    const onAddMessage = () => {
        if (dialogsPage.newMessageText.trim() !== '')
        addMessage()
    }

    const onChangeMassage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newMessageText = e.currentTarget.value
        updateNewMessageText(newMessageText)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            onAddMessage()
        }
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