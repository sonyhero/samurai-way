import React from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { CheckBox, fieldCreator, Input } from '../../../../forms-controls/FormsControl'
import { required } from '../../../../../utils/validators'
import s from './Login-form.module.scss'
import { useAppSelector } from '../../../../../app/store'
import { Typography } from '../../../../ui/typography'
import { Button } from '../../../../ui/button'
import { Card } from '../../../../ui/card'
import { getCaptchaUrl } from '../../../../../app/model/selectors/auth-selector'

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType>> = (props) => {
  const captcha = useAppSelector(getCaptchaUrl)

  return (
    <Card className={s.container}>
      <div>
        <Typography>
          To log in get registered on{' '}
          <Typography as={'a'} href={'https://social-network.samuraijs.com/'} target={'_blank'} rel="noreferrer">
            this site
          </Typography>
        </Typography>
        <Typography>or use common test account credentials:</Typography>
        <Typography>Email: free@samuraijs.com</Typography>
        <Typography>Password: free</Typography>
      </div>

      <form onSubmit={props.handleSubmit} className={s.formContainer}>
        <Typography className={s.title} variant={'large'}>
          Login
        </Typography>
        <div>{fieldCreator('email', 'Email', [required], Input)}</div>
        <div>{fieldCreator('password', 'Password', [required], Input, { type: 'password' })}</div>
        {props.error && <div className={s.error}>{props.error}</div>}
        <div className={s.checkBox}>
          {fieldCreator('rememberMe', '', [], CheckBox, { type: 'checkbox' }, 'Remember Me')}
        </div>
        {/*//--------------------------------------------------------*/}

        {captcha && <img src={`${captcha}`} alt={'anti-bot captcha'} />}
        {captcha && <div>{fieldCreator('captcha', 'Captcha', [required], Input)}</div>}

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
