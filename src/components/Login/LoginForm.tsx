import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";

export type FormLoginDataType = {
    userName: string
    password: string
    rememberMe: boolean
}


const LoginForm: React.FC<InjectedFormProps<FormLoginDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field name={'userName'} placeholder={'User name'} component={'input'}/></div>
            <div><Field name={'password'} placeholder={'Password'} component={'input'}/></div>
            <div><Field name={'rememberMe'} type={'checkbox'} component={'input'}/> remember me</div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

export const LoginReduxForm =
    reduxForm<FormLoginDataType>({
        form: 'login'
    })(LoginForm)