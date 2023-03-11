import React from 'react';
import s from './DialogsCSS.module.css'
import {NavLink} from 'react-router-dom';

export const Dialogs = () => {
    return (
        <div>
            Dialogs
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>

                    <div className={s.dialog + ' ' + s.active}>
                        <NavLink to="/dialogs/1">Sveta</NavLink>
                    </div>
                    <div className={s.dialog}>
                        <NavLink to="/dialogs/2">Viktor</NavLink>
                    </div>
                    <div className={s.dialog}>
                        <NavLink to="/dialogs/3">Dimych</NavLink>
                    </div>
                    <div className={s.dialog}>
                        <NavLink to="/dialogs/4">Maks</NavLink>
                    </div>
                    <div className={s.dialog}>
                        <NavLink to="/dialogs/5">Igor</NavLink>
                    </div>

                </div>
                <div className={s.messages}>
                    <div className={s.message}>Hi</div>
                    <div className={s.message}>How are you</div>
                    <div className={s.message}>I am good</div>
                </div>
            </div>

        </div>
    )
}