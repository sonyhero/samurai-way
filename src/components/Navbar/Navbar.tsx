import React from 'react'
import s from './NavbarCSS.module.css'
import {NavLink} from 'react-router-dom'

// type FriendsType = {
//     id: number
//     name: string
// }
//
// type NavbarStateType = {
//     friends: FriendsType[]
// }
// type NavbarPropsType = {
//     state: NavbarStateType
// }
//
// type NavbarPropsType = {
// }

export const Navbar = () => {

    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/news" activeClassName={s.activeLink}>News</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/music" activeClassName={s.activeLink}>Music</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/settings" activeClassName={s.activeLink}>Settings</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to="/users" activeClassName={s.activeLink}>Users</NavLink>
            </div>
            {/*<div className={`${s.item} ${s.active}`}>*/}
            {/*    <NavLink to="/users" activeClassName={s.activeLink}>*/}
            {/*        /!*<div>*!/*/}
            {/*        /!*    <div>Users</div>*!/*/}
            {/*        /!*    <ul>*!/*/}
            {/*        /!*        {friendsMap}*!/*/}
            {/*        /!*    </ul>*!/*/}
            {/*        /!*</div>*!/*/}

            {/*    </NavLink>*/}
            {/*</div>*/}
        </nav>
    )
}