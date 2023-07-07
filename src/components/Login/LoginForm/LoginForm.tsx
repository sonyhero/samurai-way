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
        <form onSubmit={props.handleSubmit}>
            {/*<div>*/}
            {/*    <Field name={'email'} placeholder={'Email'} component={Input}*/}
            {/*           validate={[required]}*/}
            {/*    />*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <Field name={'password'} placeholder={'Password'} component={Input} type={'password'}*/}
            {/*           validate={[required]}*/}
            {/*    />*/}
            {/*</div>*/}
            {/*<div*/}
            {/*><Field name={'rememberMe'} type={'checkbox'} component={Input}/> remember me*/}
            {/*</div>*/}

            {/*Рефакторинг*/}
            {fieldCreator('email', 'Email', [required], Input)}
            {fieldCreator('password', 'Password', [required], Input, {type: 'password'})}
            {fieldCreator('rememberMe', '', [], Input, {type: 'checkbox'}, 'rememberMe')}
            {/*//--------------------------------------------------------*/}

            {props.error && <div className={s.summeryError}>{props.error}</div>}

            {captcha && <img src={`${captcha}`} alt={'anti-bot captcha'}/>}

            <div>
                <Button name={'Login'}/>
            </div>
        </form>
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
}