import React from 'react';
import s from './HeaderCSS.module.css'
import {HeaderAPIComponentType} from './HeaderContainer';
import {Button} from '../common/Button/Button';

export const Header: React.FC<HeaderPropsType> = (props) => {

    const {isAuth, login, logout} = props

    return (
        <header className={s.header}>
            <div className={s.loginBlock}>
                {/*{isAuth*/}
                {/*    ? <div>{login} -<Button xType={'red'} name={'Log out'} callback={logout}/></div>*/}
                {/*    : <NavLink to={'/login'}>Login</NavLink>*/}
                {/*}*/}
                <div className={s.networkName} ><h1>Social Network</h1></div>
                {isAuth && <div>{login} -<Button xType={'red'} name={'Log out'} callback={logout}/></div>}
            </div>
        </header>
    )
}

//Types
type HeaderPropsType = HeaderAPIComponentType