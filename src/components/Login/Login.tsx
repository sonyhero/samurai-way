import React from 'react';
import {FormDataType, LoginForm} from "./LoginForm";
import {reduxForm} from "redux-form";

export const Login  = () => {
    const onSubmit = (formData: FormDataType) => {

    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const LoginReduxForm =
    reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)