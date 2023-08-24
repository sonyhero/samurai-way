import React from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { fieldCreator, Input } from '../../common/FormsControls/FormsControl'
import { required } from '../../../utils/validators'
import s from '../LoginCSS.module.css'
import { useSelector } from 'react-redux'
import { RootReducerType } from '../../../app/store'

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType>> = (props) => {
  const captcha = useSelector<RootReducerType>((state) => state.authReducer.captchaUrl)

  return (
    <div className={s.container}>
      <form onSubmit={props.handleSubmit} className={s.formContainer}>
        <h3>Login Here</h3>
        {/*Рефакторинг*/}
        <div className={s.input}>{fieldCreator('email', 'Email', [required], Input)}</div>
        <div className={s.input}>{fieldCreator('password', 'Password', [required], Input, { type: 'password' })}</div>
        <div className={s.checkBox}>
          {fieldCreator('rememberMe', '', [], Input, { type: 'checkbox' }, 'Remember Me')}
        </div>
        {/*//--------------------------------------------------------*/}
        {props.error && <div className={s.error}>{props.error}</div>}

        {captcha && <img src={`${captcha}`} alt={'anti-bot captcha'} />}
        {captcha && <div className={s.input}>{fieldCreator('captcha', 'Captcha', [required], Input)}</div>}

        <div className={s.sbtButton}>
          <button type={'submit'}>Login</button>
        </div>
      </form>
      <div className={s.testData}>
        <div>
          <p>You can also use common test account credentials:</p>
        </div>
        <div>
          <p>Email: free@samuraijs.com</p>
        </div>
        <div>
          <p>Password: free</p>
        </div>
      </div>
    </div>
  )
}

export const LoginReduxForm = reduxForm<LoginFormDataType>({
  form: 'login',
})(LoginForm)

// Types
export type LoginFormDataType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}
