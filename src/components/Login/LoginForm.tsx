import React from 'react';
import {Field, InjectedFormProps} from "redux-form";

export type FormDataType = {
    userName: string
    password: string
    rememberMe: boolean
}

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
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