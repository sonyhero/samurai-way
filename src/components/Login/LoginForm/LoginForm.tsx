import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {fieldCreator, Input} from '../../common/FormsControls/FormsControl';
import {required} from '../../../utils/validators';
import s from '../LoginCSS.module.css';
import {Button} from '../../common/Button/Button';
import {useSelector} from 'react-redux';
import {RootReducerType} from '../../../app/store';

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType>> = (props) => {

    const captcha = useSelector<RootReducerType>(state => state.authReducer.captchaUrl)

    return (
        <div className={s.container}>
            <form onSubmit={props.handleSubmit} className={s.formContainer}>
                <h3>Login Here</h3>
                {/*Рефакторинг*/}
                <div className={s.input}>
                    {fieldCreator('email', 'Email', [required], Input)}
                </div>
                <div className={s.input}>
                    {fieldCreator('password', 'Password', [required], Input, {type: 'password'})}
                </div>
                <div>
                    {fieldCreator('rememberMe', '', [], Input, {type: 'checkbox'}, 'rememberMe')}
                </div>
                {/*//--------------------------------------------------------*/}
                {props.error && <div >{props.error}</div>}

                {captcha && <img src={`${captcha}`} alt={'anti-bot captcha'}/>}
                {captcha && fieldCreator('captcha', '', [required], Input)}

                <div>
                    <Button name={'Login'}/>
                </div>
            </form>
        </div>
    )
}

export const LoginReduxForm = reduxForm<LoginFormDataType>({
    form: 'login'
})(LoginForm)

// Types
export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}