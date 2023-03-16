import React from 'react';
import s from './../DialogsCSS.module.css'
import {NavLink} from 'react-router-dom';

type DialogItemType = {
    name: string
    id: string
}
export const DialogItem = (props: DialogItemType) => {
    let path = '/dialogs/' + props.id
    return (
        <div className={s.dialog}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

