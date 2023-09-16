import React from 'react'
import { login } from '../model/auth-reducer'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { Redirect } from 'react-router-dom'
import { getIsAuth } from '../../../../app/model/selectors/auth-selector'
import { LoginFormDataType, LoginReduxForm } from './LoginForm/LoginForm'

const LoginPage = () => {
  const isAuth = useAppSelector(getIsAuth)
  const dispatch = useAppDispatch()

  const onSubmit = (formData: LoginFormDataType) => {
    const { email, password, rememberMe, captcha } = formData
    dispatch(login(email, password, rememberMe, captcha))
  }

  return isAuth ? <Redirect to={'/profile'} /> : <LoginReduxForm onSubmit={onSubmit} />
}

export default LoginPage
