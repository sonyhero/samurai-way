import React, {ChangeEvent, KeyboardEvent} from 'react';
import {DialogItem} from './DialogItem/DialogsItem';
import {Message} from './Message/Message';
import {ActionsTypes, DialogsPageType, StoreType} from '../../redux/state';
import {addMessageAC, updateNewMessageTextAC} from '../../redux/dialogs-reducer';
import {Dialogs} from "./Dialogs";


type DialogsPropsType = {
    // dialogsPage: DialogsPageType
    // dispatch: (action: ActionsTypes) => void
    store: StoreType
}

export const DialogsContainer = (props: DialogsPropsType) => {

    const state = props.store.getState()

    // const dialogsDataMap = props.dialogsPage.dialogs.map(
    //     d => <DialogItem name={d.name} id={d.id}/>
    // )
    //
    // const messagesDataMap = props.dialogsPage.messages.map(
    //     m => <Message messageText={m.messageText} id={m.id}/>
    // )

    const addMessage = () => {
        if (state.dialogsPage.newMessageText.trim() !== '')
            props.store.dispatch(addMessageAC())
    }

    const changeMassage = (newMessageText: string) => {
        props.store.dispatch(updateNewMessageTextAC(newMessageText))
    }

    // const onKeyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    //     if (e.key === 'Enter') addMessage()
    // }

    return (
        <Dialogs
            addMessage={addMessage}
            changeMassage={changeMassage}
            dialogsPage={state.dialogsPage}
        />
    )
}