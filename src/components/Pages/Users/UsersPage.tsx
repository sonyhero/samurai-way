import React from 'react'
import { useAppSelector } from '../../../app/store'
import Users from './Users'
import { getIsAuth } from '../../../app/selectors/auth-selector'
import { Redirect } from 'react-router-dom'

export const UsersPage = () => {
  const isAuth = useAppSelector(getIsAuth)

  return isAuth ? <Users /> : <Redirect to={'/login'} />
}
