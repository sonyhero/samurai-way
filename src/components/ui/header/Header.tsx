import React from 'react'
import s from './Header.module.scss'
import { Typography } from '../typography'
import { Button } from '../button'
import { Logout } from '../../../assets'
import { AvatarDemo } from '../avatar'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { DropDownMenuDemo } from '../dropDownMenu'
import { getProfilePhotoSmall } from '../../../app/model/selectors/profile-selector'
import { getIsAuth, getLogin } from '../../../app/model/selectors/auth-selector'
import { logout } from '../../Pages/Login/model/auth-reducer'

export const Header = () => {
  const userPhoto = useAppSelector(getProfilePhotoSmall)
  const isAuth = useAppSelector(getIsAuth)
  const login = useAppSelector(getLogin)
  const dispatch = useAppDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  const dropDownItems = [
    { id: 1, component: <Typography className={s.userName}>{login}</Typography> },
    {
      id: 2,
      component: (
        <Button className={s.logoutBtn} variant={'secondary'} onClick={logoutHandler}>
          <Logout />
          Log out
        </Button>
      ),
    },
  ]

  return (
    <header className={s.header}>
      <div className={s.contentBox}>
        <Typography className={s.networkName} variant={'large'}>
          Social Network
        </Typography>
        <div className={s.loginBlock}>
          {isAuth && (
            <>
              <Typography className={s.userName}>{login}</Typography>
              <DropDownMenuDemo
                items={dropDownItems}
                trigger={<AvatarDemo className={s.avatar} name={login ? login : ''} src={userPhoto} />}
              />
            </>
          )}
        </div>
      </div>
    </header>
  )
}
