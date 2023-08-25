import React from 'react'
import s from './Header.module.scss'
import { Typography } from '../ui/typography'
import { Button } from '../ui/button'
import { HeaderAPIComponentType } from './HeaderContainer'

export const Header: React.FC<HeaderPropsType> = (props) => {
  const { isAuth, login, logout } = props

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
              <Button className={s.logoutBtn} variant={'secondary'} onClick={logout}>
                Log out
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

//Types
type HeaderPropsType = HeaderAPIComponentType
