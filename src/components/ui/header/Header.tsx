import React from 'react'
import s from './Header.module.scss'
import { Typography } from '../typography'
import { Button } from '../button'
import { Logout } from '../../../assets'
import { AvatarDemo } from '../avatar'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { getAuthorizedProfilePhotoSmall } from '../../../app/model/selectors/profile-selector'
import { getIsAuth, getLogin } from '../../../app/model/selectors/auth-selector'
import { logout } from '../../Pages/Login/model/auth-reducer'

export const Header = () => {
  const userPhoto = useAppSelector(getAuthorizedProfilePhotoSmall)
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
      <div className={s.contentBlock}>
        <Typography variant={'large'}>Social Network</Typography>
        {isAuth && (
          <Typography className={s.userName}>
            {login}
            <AvatarDemo name={login ? login : ''} src={userPhoto} />
          </Typography>
        )}
      </div>
    </header>
  )
}
