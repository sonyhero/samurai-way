import React from 'react';
import s from './NavbarCSS.module.css'
import {NavLink} from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/profile">Profile</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/dialogs">Messages</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/news">News</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/music">Music</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/settings">Settings</NavLink>
            </div>
        </nav>
    )
}