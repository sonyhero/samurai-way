import React from 'react';
import {connect} from 'react-redux';
import {login} from './auth-reducer';
import {RootReducerType} from '../../app/store';
import {Redirect} from 'react-router-dom';
import {getIsAuth} from '../../app/selectors/auth-selector';
import {LoginFormDataType, LoginReduxForm} from './LoginForm/LoginForm';


const Login: React.FC<LoginPropsType> = (props) => {

    const {login, isAuth} = props

    const onSubmit = (formData: LoginFormDataType) => {
        const {email, password, rememberMe, captcha} = formData
        login(email, password, rememberMe, captcha)
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
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginPropsType = MapStateToPropsType & MapDispatchToPropsType