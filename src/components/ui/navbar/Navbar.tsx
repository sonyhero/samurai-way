import React, { useState } from 'react'
import s from './Navbar.module.scss'
import { NavLink, useLocation } from 'react-router-dom'
import { ChatNav, MessagesNav, MusicNav, NewsNav, ProfileNav, SettingsNav, UsersNav } from '../../../assets/iconsNavbar'
import { PATH } from '../../../config/routes'
import { useAppDispatch } from '../../../app/store'
import { logout } from '../../Pages/Login/model/auth-reducer'
import { Logout } from '../../../assets'
import { Modal } from '../modal'

export const Navbar = () => {
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const [modalMode, setModalMode] = useState<boolean>(false)

  const modalOpenHandler = () => {
    setModalMode(true)
  }
  const modalCloseHandler = () => {
    setModalMode(false)
  }

  const logoutHandler = () => {
    dispatch(logout())
  }

  const defaultColor = '#000'
  const activeColor = '#407c87'

  const navLinks = [
    {
      path: PATH.PROFILE,
      value: (
        <>
          <ProfileNav fill={pathname === PATH.PROFILE ? activeColor : defaultColor} />
          <span>Profile</span>
        </>
      ),
    },
    {
      path: PATH.NEWS,
      value: (
        <>
          <NewsNav fill={pathname === PATH.NEWS ? activeColor : defaultColor} /> <span>News</span>
        </>
      ),
    },
    {
      path: PATH.DIALOGS,
      value: (
        <>
          <MessagesNav fill={pathname === PATH.DIALOGS ? activeColor : defaultColor} /> <span>Messages</span>
        </>
      ),
    },
    {
      path: PATH.USERS,
      value: (
        <>
          <UsersNav fill={pathname === PATH.USERS ? activeColor : defaultColor} /> <span>Users</span>
        </>
      ),
    },
    {
      path: PATH.CHAT,
      value: (
        <>
          <ChatNav fill={pathname === PATH.CHAT ? activeColor : defaultColor} /> <span>Chat</span>
        </>
      ),
    },
    {
      path: PATH.MUSIC,
      value: (
        <>
          <MusicNav fill={pathname === PATH.MUSIC ? activeColor : defaultColor} /> <span>Music</span>
        </>
      ),
    },
    {
      path: PATH.SETTINGS,
      value: (
        <>
          <SettingsNav fill={pathname === PATH.SETTINGS ? activeColor : defaultColor} /> <span>Settings</span>
        </>
      ),
    },
  ]

  const mappedLinks = navLinks.map((navLink, index) => {
    return (
      <div key={index} className={s.item}>
        <NavLink to={navLink.path} className={s.link} activeClassName={s.activeLink}>
          {navLink.value}
        </NavLink>
      </div>
    )
  })

  return (
    <nav className={s.nav}>
      {mappedLinks}
      <div onClick={modalOpenHandler} className={s.item}>
        <div className={s.link}>
          <Logout fill={defaultColor} />
          <span>Log Out</span>
        </div>
      </div>
      <Modal
        showCloseButton={true}
        callBack={logoutHandler}
        title={'Log Out'}
        open={modalMode}
        onClose={modalCloseHandler}
        titleButton={'Yes'}
      >
        Do you really want to log out?
      </Modal>
    </nav>
  )
}
