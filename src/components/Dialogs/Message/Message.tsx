import React from 'react';
import s from './../DialogsCSS.module.css'
import {MessageType} from '../../../App';

export const Message = (props:MessageType) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

