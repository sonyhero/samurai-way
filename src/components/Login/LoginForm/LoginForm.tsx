import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {FieldCreator, Input} from "../../common/FormsControls/FormsControl";
import {required} from "../../../utils/validators";
import s from "../LoginCSS.module.css";
import {Button} from "../../common/Button/Button";

const LoginForm: React.FC<InjectedFormProps<FormLoginDataType>> = (props) => {
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
            {FieldCreator('email', 'Email', [required], Input)}
            {FieldCreator('password', 'Password', [required], Input, {type: 'password'})}
            {FieldCreator('rememberMe', '', [], Input, {type: 'checkbox'}, 'rememberMe')}
            {/*//--------------------------------------------------------*/}

            {props.error && <div className={s.summeryError}>{props.error}</div>}
            <div>
                <Button name={'Login'}/>
            </div>
        </form>
    )
}

export const LoginReduxForm = reduxForm<FormLoginDataType>({
    form: 'login'
})(LoginForm)

// Types
export type FormLoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}