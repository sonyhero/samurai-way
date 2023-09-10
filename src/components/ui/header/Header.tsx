import React from 'react'
import s from './Header.module.scss'
import { Typography } from '../typography'
import { Button } from '../button'
import { HeaderAPIComponentType } from './HeaderContainer'
import { Logout } from '../../../assets'
import { AvatarDemo } from '../avatar'
import { useAppSelector } from '../../../app/store'
import { DropDownMenuDemo } from '../dropDownMenu'

export const Header: React.FC<HeaderPropsType> = (props) => {
  const { isAuth, login, logout } = props

  const userPhoto = useAppSelector((state) => state.profileReducer.profile.photos.small)
  const dropDownItems = [
    { id: 1, component: <Typography className={s.userName}>{login}</Typography> },
    {
      id: 2,
      component: (
        <Button className={s.logoutBtn} variant={'secondary'} onClick={logout}>
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
              {/*<Button className={s.logoutBtn} variant={'secondary'} onClick={logout}>*/}
              {/*  <Logout />*/}
              {/*  Log out*/}
              {/*</Button>*/}
            </>
          )}
        </div>
      </div>
    </header>
  )
}

//Types
type HeaderPropsType = HeaderAPIComponentType
