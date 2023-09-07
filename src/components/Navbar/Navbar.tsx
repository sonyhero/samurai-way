import React from 'react'
import s from './Navbar.module.scss'
import { NavLink } from 'react-router-dom'
import { ChatNav, MessagesNav, MusicNav, NewsNav, ProfileNav, SettingsNav } from '../../assets/iconsNavbar'
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
      <div className={s.item}>
        <NewsNav />
        <NavLink to="/news" activeClassName={s.activeLink}>
          News
        </NavLink>
      </div>
      <div className={s.item}>
        <MessagesNav />
        <NavLink to="/dialogs" activeClassName={s.activeLink}>
          Messages
        </NavLink>
      </div>
      <div className={s.item}>
        <UsersNav />
        <NavLink to="/users" activeClassName={s.activeLink}>
          Users
        </NavLink>
      </div>
      <div className={s.item}>
        <ChatNav />
        <NavLink to="/chat" activeClassName={s.activeLink}>
          Chat
        </NavLink>
      </div>
      <div className={s.item}>
        <MusicNav />
        <NavLink to="/music" activeClassName={s.activeLink}>
          Music
        </NavLink>
      </div>
      <div className={s.item}>
        <SettingsNav />
        <NavLink to="/settings" activeClassName={s.activeLink}>
          Settings
        </NavLink>
      </div>
    </nav>
  )
}
