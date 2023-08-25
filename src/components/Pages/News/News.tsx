import React from 'react'
import { useAppSelector } from '../../../app/store'
import { getIsAuth } from '../../../app/selectors/auth-selector'
import { Redirect } from 'react-router-dom'

export const News = () => {
  const isAuth = useAppSelector(getIsAuth)

  return !isAuth ? <Redirect to={'/login'} /> : <div>News</div>
}
