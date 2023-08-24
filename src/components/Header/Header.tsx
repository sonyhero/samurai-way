import React from 'react'
import s from './HeaderCSS.module.css'
import { HeaderAPIComponentType } from './HeaderContainer'
import { Button } from '../common/Button/Button'

export const Header: React.FC<HeaderPropsType> = (props) => {
  const { isAuth, login, logout } = props

  return (
    <header className={s.header}>
      <div className={s.networkName}>
        <h1>Social Network</h1>
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
