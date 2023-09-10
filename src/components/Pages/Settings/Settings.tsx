import React from 'react'
import { useAppSelector } from '../../../app/store'
import { getIsAuth } from '../../../app/model/selectors/auth-selector'
import { Redirect } from 'react-router-dom'

export const Settings = () => {
  const isAuth = useAppSelector(getIsAuth)

  return !isAuth ? <Redirect to={'/login'} /> : <div>Settings</div>
}
