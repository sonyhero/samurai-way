import React from 'react';
import s from './HeaderCSS.module.css'
import {NavLink} from 'react-router-dom';
import {HeaderAPIComponentType} from './HeaderContainer';
import {Button} from '../common/Button/Button';

type HeaderPropsType = HeaderAPIComponentType
export const Header: React.FC<HeaderPropsType> = (props) => {

    const {isAuth, login, logout} = props

    return (
        <header className={s.header}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLxOuoX74j_i0OvkPIIwhN6uVhK4KXc9JPjQ&usqp=CAU"
                alt="itachi logo"/>
            <div className={s.loginBlock}>
                {isAuth
                    ? <div>{login} -<Button xType={'red'} name={'Log out'} callback={logout}/></div>
                    : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    )
}