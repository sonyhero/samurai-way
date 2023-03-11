import React from 'react';
import s from './DialogsCSS.module.css'
import {NavLink} from 'react-router-dom';

type DialogItemType = {
    name: string
    id: string
}
const DialogItem = (props: DialogItemType) => {
    let path = '/dialogs/' + props.id
    return (
        <div className={s.dialog}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

type MessageType = {
    message: string
}

const Message = (props:MessageType) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

export const Dialogs = () => {

    let dialogsData = [
        {id:1, name: 'Dimych'},
        {id:2, name: 'Sveta'},
        {id:3, name: 'Viktor'},
        {id:4, name: 'Maks'},
        {id:5, name: 'Igor'},
    ]

    let messagesData = [
        {id:1, message: 'Hi'},
        {id:2, message: 'Anton'},
        {id:3, message: 'How are you'},
    ]

    let dialogsDataMap = dialogsData.map(
        el=><DialogItem name={el.name} id={`${el.id}`}/>
    )

    let messagesDataMap = messagesData.map(
        el=><Message message={el.message}/>
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