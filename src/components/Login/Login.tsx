import React from 'react';
import {FormLoginDataType, LoginReduxForm} from "./LoginForm";

export const Login  = () => {
    const onSubmit = (formData: FormLoginDataType) => {
        console.log(formData)
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}
