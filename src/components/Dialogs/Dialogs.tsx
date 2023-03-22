import React from 'react';
import s from './DialogsCSS.module.css'
import {DialogItem} from './DialogItem/DialogsItem';
import {Message} from './Message/Message';
import {DialogItemType, MessageType} from '../../App';

export type DialogsPropsType = {
    state: DialogsStateType

}

type DialogsStateType = {
    dialogs: DialogItemType[]
    messages: MessageType[]
}

export const Dialogs = (props:DialogsPropsType) => {

    // let dialogsDataMap = props.dialogs.map(
    //     d => <DialogItem name={d.name} id={d.id}/>
    // )
    const dialogsDataMap = props.state.dialogs.map(
        d => <DialogItem name={d.name} id={d.id}/>
    )

    const messagesDataMap = props.state.messages.map(
        m => <Message message={m.message}/>
    )

    const newMassageElement = React.createRef<HTMLTextAreaElement>()

    const addMessage = () => {
      const text = newMassageElement.current?.value
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
                <textarea ref={newMassageElement}></textarea>
            </div>
            <div>
                <button onClick={addMessage}>Add message</button>
            </div>
        </div>
    )
}