import React from 'react'
import s from './HeaderCSS.module.css'
import { HeaderAPIComponentType } from './HeaderContainer'
import { Button } from '../common/Button/Button'
import { Typography } from '../ui/typography'

export const Header: React.FC<HeaderPropsType> = (props) => {
  const { isAuth, login, logout } = props

  return (
    <header className={s.header}>
      <div className={s.networkName}>
        <Typography variant={'large'}>Social Network</Typography>
      </div>
      <div className={s.loginBlock}>
        {isAuth && (
          <>
            {login} <Button xType={'red'} name={'Log out'} callback={logout} />
          </>
        )}
      </div>
    </header>
  )
}

//Types
type HeaderPropsType = HeaderAPIComponentType
