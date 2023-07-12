import React from 'react';
import s from './FormsControls.module.css'
import {Field} from 'redux-form';

export const FormControl: React.FC<FormControlType> = (props) => {

    const {input, meta: {touched, error}, children, ...restProps} = props

    const isError = touched && error
    const finalClassName = `${s.formControl} ${isError
        ? s.error
        : ''}`

    return (
        <div className={finalClassName}>
            <div>{children}</div>
            <div className={s.summeryError}>
                {isError && <span>{error}</span>}
            </div>
        </div>
    )
}

// type TextAreaType = TextareaHTMLAttributes<HTMLTextAreaElement>;
export const TextArea: React.FC<FormControlType> = (props) => {
    const {input, meta, ...restProps} = props
    return (
        <FormControl {...props}>
            <textarea  {...input} {...restProps} />
        </FormControl>)
}

// type InputType = InputHTMLAttributes<HTMLInputElement>
export const Input: React.FC<FormControlType> = (props) => {
    const {input, meta, ...restProps} = props
    return (
        <FormControl {...props}>
            <input {...input} {...restProps} />
        </FormControl>)
}

//Рефакторинг урок 90 - функция используется в компоненте Login
export const fieldCreator =
    (name: string,
     placeholder: string = '',
     validate: any[],
     component: React.FC<FormControlType>,
     props?: { type: string },
     text: string = '') => {
        return (
            <>
                <div><Field name={name} placeholder={placeholder} component={component}
                          validate={validate}
                          {...props}
                /></div>
                <div className={s.fieldName}>{text}</div>
            </>
        )
    }

//Types
type FormControlType = {
    input: {
        name: string;
        value: string;
    }
    meta: {
        touched?: boolean;
        error?: string;
    }
    children: React.ReactNode
}