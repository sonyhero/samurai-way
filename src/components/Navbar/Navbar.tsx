import React from 'react'
import s from './Navbar.module.scss'
import { NavLink } from 'react-router-dom'
import { MessagesNav, MusicNav, NewsNav, ProfileNav, SettingsNav } from '../../assets/iconsNavbar'
import { UsersNav } from '../../assets/iconsNavbar'

export const Navbar = () => {
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <ProfileNav />
        <NavLink to="/profile" activeClassName={s.activeLink}>
          Profile
        </NavLink>
      </div>
      <div className={`${s.item} ${s.active}`}>
        <NewsNav />
        <NavLink to="/news" activeClassName={s.activeLink}>
          News
        </NavLink>
      </div>
      <div className={`${s.item} ${s.active}`}>
        <MessagesNav />
        <NavLink to="/dialogs" activeClassName={s.activeLink}>
          Messages
        </NavLink>
      </div>
      <div className={`${s.item} ${s.active}`}>
        <UsersNav />
        <NavLink to="/users" activeClassName={s.activeLink}>
          Users
        </NavLink>
      </div>

      <div className={`${s.item} ${s.active}`}>
        <MusicNav />
        <NavLink to="/music" activeClassName={s.activeLink}>
          Music
        </NavLink>
      </div>
      <div className={`${s.item} ${s.active}`}>
        <SettingsNav />
        <NavLink to="/settings" activeClassName={s.activeLink}>
          Settings
        </NavLink>
      </div>
    </nav>
  )
}
