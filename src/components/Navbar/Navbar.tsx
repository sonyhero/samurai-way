import React from 'react'
import s from './NavbarCSS.module.css'
import {NavLink} from 'react-router-dom'

type FriendsType = {
    id: number
    name: string
}
type NavbarPropsType = {
    state: NavbarStateType
}

type NavbarStateType = {
    friends: FriendsType[]
}

export const Navbar = (props: NavbarPropsType) => {

    const friendsMap = props.state.friends.map(el => <li>{el.name}</li>)

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
                <NavLink to="/friends" activeClassName={s.activeLink}>
                    <div>
                        <div>Friends</div>
                        <ul>
                            {friendsMap}
                        </ul>
                    </div>

                </NavLink>
            </div>
        </nav>
    )
}