import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControl";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import {login} from "./auth-reducer";
import {RootReducerType} from "../../app/store";
import {Redirect} from "react-router-dom";
import s from "./LoginCSS.module.css";
import {getIsAuth} from '../../app/selectors/auth-selector';

const LoginForm: React.FC<InjectedFormProps<FormLoginDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'email'} placeholder={'Email'} component={Input}
                       validate={[required]}
                />
            </div>
            <div>
                <Field name={'password'} placeholder={'Password'} component={Input} type={'password'}
                       validate={[required]}
                />
            </div>
            <div
            ><Field name={'rememberMe'} type={'checkbox'} component={Input}/> remember me
            </div>
            {props.error && <div className={s.summeryError}>{props.error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormLoginDataType>({
    form: 'login'
})(LoginForm)

const Login: React.FC<LoginPropsType> = (props) => {

    const {login, isAuth} = props

    const onSubmit = (formData: FormLoginDataType) => {
        const {email, password, rememberMe} = formData
        login(email, password, rememberMe)
    }

    return (isAuth)
        ? <Redirect to={'/profile'}/>
        : <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>

}

const mapStateToProps = (state: RootReducerType): MapStateToPropsType => {
    return {
        isAuth: getIsAuth(state)
    }
}

export default connect(mapStateToProps, ({
    login
}))(Login)

//Types
export type MapStateToPropsType = {
    isAuth: boolean
}
type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}
type FormLoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}
type LoginPropsType = MapStateToPropsType & MapDispatchToPropsType