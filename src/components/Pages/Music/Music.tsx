import React from 'react'
import { useAppSelector } from '../../../app/store'
import { getIsAuth } from '../../../app/selectors/auth-selector'
import { Redirect } from 'react-router-dom'

export const Music = () => {
  const isAuth = useAppSelector(getIsAuth)
  return !isAuth ? <Redirect to={'/login'} /> : <div>Music</div>
}
