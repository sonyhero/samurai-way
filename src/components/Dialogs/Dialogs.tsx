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
    return (
        <div>
            Dialogs
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                    <DialogItem name={'Dimych'} id={'1'}/>
                    <DialogItem name={'Sveta'} id={'2'}/>
                    <DialogItem name={'Viktor'} id={'3'}/>
                    <DialogItem name={'Maks'} id={'4'}/>
                    <DialogItem name={'Igor'} id={'5'}/>
                </div>
                <div className={s.messages}>
                    <Message message={'Hi'}/>
                    <Message message={'How are you'}/>
                    <Message message={'I am good'}/>
                </div>
            </div>

        </div>
    )
}