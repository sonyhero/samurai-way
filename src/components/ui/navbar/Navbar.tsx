import React from 'react'
import s from './Navbar.module.scss'
import { NavLink, useLocation } from 'react-router-dom'
import { ChatNav, MessagesNav, MusicNav, NewsNav, ProfileNav, SettingsNav, UsersNav } from '../../../assets/iconsNavbar'
import { PATH } from '../../../config/routes'

export const Navbar = () => {
  const { pathname } = useLocation()

  const defaultColor = '#000'
  const activeColor = '#407c87'

  const navLinks = [
    {
      path: PATH.PROFILE,
      value: (
        <span>
          <ProfileNav fill={pathname === PATH.PROFILE ? activeColor : defaultColor} /> Profile
        </span>
      ),
    },
    {
      path: PATH.NEWS,
      value: (
        <span>
          <NewsNav fill={pathname === PATH.NEWS ? activeColor : defaultColor} /> News
        </span>
      ),
    },
    {
      path: PATH.DIALOGS,
      value: (
        <span>
          <MessagesNav fill={pathname === PATH.DIALOGS ? activeColor : defaultColor} /> Messages
        </span>
      ),
    },
    {
      path: PATH.USERS,
      value: (
        <span>
          <UsersNav fill={pathname === PATH.USERS ? activeColor : defaultColor} /> Users
        </span>
      ),
    },
    {
      path: PATH.CHAT,
      value: (
        <span>
          <ChatNav fill={pathname === PATH.CHAT ? activeColor : defaultColor} /> Chat
        </span>
      ),
    },
    {
      path: PATH.MUSIC,
      value: (
        <span>
          <MusicNav fill={pathname === PATH.MUSIC ? activeColor : defaultColor} /> Music
        </span>
      ),
    },
    {
      path: PATH.SETTINGS,
      value: (
        <span>
          <SettingsNav fill={pathname === PATH.SETTINGS ? activeColor : defaultColor} /> Settings
        </span>
      ),
    },
  ]

  const mappedLinks = navLinks.map((navLink, index) => {
    return (
      <div key={index} className={s.item}>
        <NavLink to={navLink.path} activeClassName={s.activeLink}>
          {navLink.value}
        </NavLink>
      </div>
    )
  })

  return <nav className={s.nav}>{mappedLinks}</nav>
}
