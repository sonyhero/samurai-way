import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControl";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";

const LoginForm: React.FC<InjectedFormProps<FormLoginDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'email'} placeholder={'Email'} component={Input}
                       // validate={[required]}
                />
            </div>
            <div>
                <Field name={'password'} placeholder={'Password'} component={Input} type={'password'}
                       // validate={[required]}
                />
            </div>
            <div
            ><Field name={'rememberMe'} type={'checkbox'} component={Input}/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm =
    reduxForm<FormLoginDataType>({
        form: 'login'
    })(LoginForm)

const Login:React.FC<LoginPropsType> = (props) => {

    const onSubmit = (formData: FormLoginDataType) => {
        debugger
        console.log(formData)
        const {email, password, rememberMe} = formData
        props.login(email, password, rememberMe)
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

export default connect(null,({
    login
}))(Login)

type FormLoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}
type LoginPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}