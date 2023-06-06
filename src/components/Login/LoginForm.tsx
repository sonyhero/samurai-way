import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Input} from '../common/FormsControls/FormsControl';
import {required} from '../../utils/validators';

export type FormLoginDataType = {
    userName: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormLoginDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'userName'} placeholder={'User name'} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field name={'password'} placeholder={'Password'} component={Input} validate={[required]}/>
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

export const LoginReduxForm =
    reduxForm<FormLoginDataType>({
        form: 'login'
    })(LoginForm)