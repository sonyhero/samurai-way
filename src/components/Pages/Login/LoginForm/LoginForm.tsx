import React from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { CheckBox, fieldCreator, Input } from '../../../common/FormsControls/FormsControl'
import { required } from '../../../../utils/validators'
import s from './Login-form.module.scss'
import { useSelector } from 'react-redux'
import { RootReducerType, useAppSelector } from '../../../../app/store'
import { Typography } from '../../../ui/typography'
import { Button } from '../../../ui/button'
import { Card } from '../../../ui/card'
import { getCaptchaUrl } from '../../../../app/selectors/auth-selector'

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType>> = (props) => {
  const captcha = useAppSelector(getCaptchaUrl)

  return (
    <Card className={s.container}>
      <Typography>
        To log in get registered on{' '}
        <Typography as={'a'} href={'https://social-network.samuraijs.com/'} target={'_blank'} rel="noreferrer">
          this site
        </Typography>
      </Typography>
      <Typography>or use common test account credentials:</Typography>
      <Typography>Email: free@samuraijs.com</Typography>
      <Typography>Password: free</Typography>
      <Typography className={s.title} variant={'large'}>
        Login
      </Typography>
      <form onSubmit={props.handleSubmit} className={s.formContainer}>
        <div className={s.inputBox}>{fieldCreator('email', 'Email', [required], Input)}</div>
        <div className={s.inputBox}>
          {fieldCreator('password', 'Password', [required], Input, { type: 'password' })}
        </div>
        <div className={s.checkBox}>
          {fieldCreator('rememberMe', '', [], CheckBox, { type: 'checkbox' }, 'Remember Me')}
        </div>
        {/*//--------------------------------------------------------*/}
        {/*{props.error && <div className={s.error}>{props.error}</div>}*/}

        {captcha && <img src={`${captcha}`} alt={'anti-bot captcha'} />}
        {captcha && <div className={s.inputBox}>{fieldCreator('captcha', 'Captcha', [required], Input)}</div>}

        <Button fullWidth={true} className={s.submit} type={'submit'}>
          Login
        </Button>
      </form>
    </Card>
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
